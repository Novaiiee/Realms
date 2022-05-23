import { PrismaClient, Realm } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

export type RealmWithPosts =
	| (Realm & {
			posts: PostWithUser[];
			createdAt: Date;
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
	createdAt: Date;
	id: string;
	realm: Realm;
	content: string;
	votes: number;
	title: string;
};
