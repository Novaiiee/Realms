import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const id = req.query.id as string;

	const session = await getSession({ req });
	if (!session) return res.json({ errors: ["User not logged in"] });

	const realm = await prisma.realm.findUnique({
		where: { id },
		select: {
			members: true,
			id: true,
		},
	});

	const userIds = realm?.members.map((x) => x.id);

	if (userIds?.includes(session.userId)) {
		return res.json({ error: "Already in the realm" });
	}

	await prisma.realm.update({
		data: {
			members: {
				connect: { id: session.userId },
			},
		},
		where: {
			id: realm?.id,
		},
	});

	return res.json({ errors: [] });
}
