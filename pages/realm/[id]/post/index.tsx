import Navbar from "@components/shared/Navbar";
import prisma from "@lib/prisma";
import { PostWithUser } from "@lib/types";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { postId } = query as { postId: string };

	const post: PostWithUser = (await prisma.post.findUnique({
		where: {
			id: postId,
		},
		select: {
			realm: {
				select: {
					id: true,
					name: true,
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
	})) as PostWithUser;

	if (post === null) {
		return {
			props: {},
			redirect: {
				destination: "/",
			},
		};
	}

	return {
		props: {
			post: {
				...post,
				createdAt: post.createdAt ? post.createdAt.toJSON() : new Date().toJSON(),
			},
		},
	};
};

const postById: NextPage<{ post: PostWithUser }> = ({ post }) => (
	<>
		<Head>
			<title>{post?.title} - Realms</title>
		</Head>
		<main>
			<Navbar />
			<h1>{post?.title}</h1>
			<h1>{post?.content}</h1>
		</main>
	</>
);

export default postById;
