import { Community, PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

export type CommunityWithPosts =
	| (Community & {
			posts: PostWithUser[];
			_count: {
				members: number;
				posts: number;
			};
	  })
	| null;

export type PostWithUser = {
	user: {
		id: string;
		image: string | null;
		name: string | null;
	};
	id: string;
	community: Community;
	content: string;
	votes: number;
	title: string;
};
