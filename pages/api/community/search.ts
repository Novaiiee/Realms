import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const query = req.query.q as string;

	const communities = await prisma.community.findMany({
		where: {
			name: {
				search: query.replace(/[\s\n\t]/g, "_"),
			},
		},
		select: {
			name: true,
			id: true,
		},
	});

	return res.json({ data: communities });
}
