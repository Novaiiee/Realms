import Navbar from "@components/shared/Navbar";
import Post from "@components/shared/Post";
import prisma from "@lib/prisma";
import { CommunityWithPosts } from "@lib/types";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const community = await prisma.community.findUnique({
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
				select: {
					community: true,
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
	});

	if (community === null) {
		return {
			props: {},
			redirect: {
				destination: "/",
			},
		};
	}

	return {
		props: {
			community,
		},
	};
};

const communityById: NextPage<{ community: CommunityWithPosts }> = ({ community }) => (
	<>
		<Head>
			<title>{community?.name} - Realms</title>
		</Head>
		<main>
			<Navbar />
			<section className="container mx-auto py-20 space-y-10">
				<h1 className="text-4xl font-semibold">{community?.name}</h1>
				<div className="grid grid-cols-12 gap-10">
					<section className="col-span-8 space-y-6">
						{community?.posts.map((post) => (
							<Post post={post} />
						))}
					</section>
					<section className="col-span-4 border-1 border-gray-300 rounded-md p-4 max-h-fit">
						<div>
							<div className="space-y-2">
								<h3 className="font-semibold">About Community</h3>
								<p>{community?.description}</p>
								<div>
									{/* eslint-disable-next-line no-underscore-dangle */}
									<h3>Members: {community?._count.members}</h3>
								</div>
							</div>
						</div>
					</section>
				</div>
			</section>
		</main>
	</>
);

export default communityById;
