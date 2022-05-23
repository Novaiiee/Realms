import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const body = JSON.parse(req.body) as {
		title: string;
		content?: string;
		realmId: string;
		userId: string;
	};

	try {
		await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				votes: 0,
				realm: {
					connect: {
						id: body.realmId,
					},
				},
				user: {
					connect: {
						id: body.userId,
					},
				},
			},
		});
	} catch (e) {
		return res.json({ errors: [(e as Error).message] });
	}

	return res.json({ errors: [] });
}
