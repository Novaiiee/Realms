import { PostWithUser } from "@lib/types";
import formatDate from "@utils/formatDate";
import formatVotes from "@utils/formatVotes";
import shortenString from "@utils/shortenString";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback } from "react";
import { ArrowDown, ArrowUp } from "react-feather";

interface Props {
	post: PostWithUser;
}

export default function Post({ post }: Props) {
	const { data: session, status } = useSession();

	const isAuthenticated = status === "authenticated";

	const onUpvote = useCallback(async () => {
		const res = await fetch("/api/realm/post/vote", {
			method: "PUT",
			body: JSON.stringify({
				id: post.id,
				type: "increment",
			}),
		});

		if (res.ok) {
			window.location.reload();
		}
	}, []);

	const onDownvote = useCallback(async () => {
		const res = await fetch("/api/realm/post/vote", {
			method: "PUT",
			body: JSON.stringify({
				id: post.id,
				type: "decrement",
			}),
		});

		if (res.ok) {
			window.location.reload();
		}
	}, []);

	return (
		<div className="grid grid-cols-12 border-1 border-gray-300 rounded-md">
			<div className="bg-gray-300 col-span-1 flex justify-start items-center flex-col space-y-2 py-4">
				<button onClick={() => onUpvote()}>
					<ArrowUp />
				</button>
				<span>{formatVotes(post.votes)}</span>
				<button onClick={() => onDownvote()}>
					<ArrowDown />
				</button>
			</div>
			<Link href={`/realm/${post.realm.id}/post?postId=${post.id}`}>
				<div className="col-span-11 p-4">
					<div className="flex justify-between items-center">
						<h3 className="opacity-50 mb-4">
							Posted by{" "}
							<span className="font-semibold">
								{isAuthenticated && post.user.name === session?.user?.name ? "Me" : post.user.name}
							</span>
						</h3>
						<h3>{formatDate(post.createdAt.toString())}</h3>
					</div>
					<div className="space-y-2">
						<h1 className="font-medium">{post.title}</h1>
						<p>{shortenString(post.content, 300)}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
