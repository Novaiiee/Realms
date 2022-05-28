import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const { name, description } = JSON.parse(req.body) as {
		name: string;
		description: string;
	};

	const session = await getSession({ req });
	if (!session) return res.json({ errors: ["User not logged in"] });

	const foundRealm = await prisma.realm.findFirst({
		where: {
			name,
		},
	});

	if (foundRealm) {
		return res.json({ errors: ["Realm already exists"] });
	}

	const realm = await prisma.realm.create({
		data: {
			name,
			description,
			createdAt: new Date(),
			ownerId: session.userId,
			members: {
				connect: {
					id: session.userId,
				},
			},
		},
		select: {
			name: true,
			id: true,
		},
	});

	return res.json({ realmId: realm.id, errors: [] });
}
