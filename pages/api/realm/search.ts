import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const query = req.query.q as string;

	const session = await getSession({ req });
	if (!session) return res.json({ errors: ["User not logged in"] });

	const realms = await prisma.realm.findMany({
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

	return res.json({ data: realms });
}
