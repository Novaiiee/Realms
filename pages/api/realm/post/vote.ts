import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const { id, type } = JSON.parse(req.body) as {
		id: string;
		type: "increment" | "decrement";
	};

	try {
		if (type === "increment") {
			await prisma.post.update({
				where: {
					id,
				},
				data: {
					votes: { increment: 1 },
				},
			});
		} else {
			await prisma.post.update({
				where: {
					id,
				},
				data: {
					votes: { decrement: 1 },
				},
			});
		}
	} catch (e) {
		return res.json({ errors: [(e as Error).message] });
	}

	return res.json({ errors: [] });
}
