import Navbar from "@components/shared/Navbar";
import Post from "@components/shared/Post";
import prisma from "@lib/prisma";
import { RealmWithPosts } from "@lib/types";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import CreatePostModal from "../../components/realm/CreatePostModal";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const realm: RealmWithPosts = (await prisma.realm.findUnique({
		where: {
			id,
		},
		include: {
			_count: {
				select: {
					members: true,
				},
			},
			posts: {
				orderBy: {
					createdAt: "desc",
				},
				select: {
					realm: {
						select: {
							id: true,
						},
					},
					content: true,
					votes: true,
					id: true,
					title: true,
					user: {
						select: {
							image: true,
							name: true,
							id: true,
						},
					},
				},
			},
		},
	})) as RealmWithPosts;

	if (realm === null) {
		return {
			props: {},
			redirect: {
				destination: "/",
			},
		};
	}

	const createdAt = realm.createdAt.toJSON();

	const serialized = {
		...realm,
		posts: realm.posts.map((p) => ({
			...p,
			createdAt: p.createdAt ? p.createdAt.toJSON() : new Date().toJSON(),
		})),
		createdAt,
	};

	return {
		props: {
			realm: serialized,
		},
	};
};

const realmById: NextPage<{ realm: RealmWithPosts }> = ({ realm }) => {
	const { status } = useSession();

	return (
		<>
			<Head>
				<title>{realm?.name} - Realms</title>
			</Head>
			<main>
				<Navbar />
				<section className="container mx-auto py-20 space-y-10">
					<h1 className="text-4xl font-semibold">{realm?.name}</h1>
					{status === "authenticated" && (
						<Link href={`/realm/${realm?.id}/post/create`}>
							<CreatePostModal realmId={realm!.id} />
						</Link>
					)}
					<div className="grid grid-cols-12 gap-10">
						<section className="col-span-8 space-y-6">
							{realm!.posts.map((post) => (
								<Post post={post} />
							))}
						</section>
						<section className="col-span-4 border-1 border-gray-300 rounded-md p-4 max-h-fit">
							<div>
								<div className="max-h-fit space-y-2">
									<h3 className="font-semibold">About realm</h3>
									<p>{realm?.description}</p>
									<div>
										{/* eslint-disable-next-line no-underscore-dangle */}
										<h3>Members: {realm!._count.members}</h3>
									</div>
								</div>
							</div>
						</section>
					</div>
				</section>
			</main>
		</>
	);
};

export default realmById;
