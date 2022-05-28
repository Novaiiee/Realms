import PostComponent from "@components/shared/Post";
import prisma from "@lib/prisma";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import CreateRealmModal from "../components/realm/CreateRealmModal";
import Navbar from "../components/shared/Navbar";
import { PostWithUser } from "../lib/types";

export const getServerSideProps: GetServerSideProps = async () => {
	const posts = (await prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
		include: {
			realm: {
				select: {
					id: true,
					name: true,
				},
			},
			user: {
				select: {
					name: true,
					image: true,
					id: true,
				},
			},
		},
	})) as any[];

	const serialized = posts.map((post) => {
		const date = post.createdAt ? post.createdAt.toJSON() : new Date().toJSON();

		return {
			...post,
			createdAt: date,
		};
	});

	return {
		props: { posts: serialized },
	};
};

const index: NextPage<{ posts: PostWithUser[] }> = ({ posts }) => {
	const { status } = useSession();
	const isAuthenticated = status === "authenticated";

	return (
		<>
			<Head>
				<title>Realms</title>
			</Head>
			<main className="container mx-auto">
				<Navbar />
				<div className="grid grid-cols-12 gap-10">
					<section className="col-span-8 space-y-6">
						{posts.map((post) => (
							<PostComponent post={post} />
						))}
					</section>
					{isAuthenticated && (
						<section className="col-span-4 row-span-1 border-1 border-gray-300 rounded-md p-4 max-h-fit">
							<div>
								<div className="max-h-fit space-y-2">
									<CreateRealmModal />
								</div>
							</div>
						</section>
					)}
				</div>
			</main>
		</>
	);
};

export default index;
