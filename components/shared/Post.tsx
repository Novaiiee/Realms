/* eslint-disable jsx-a11y/anchor-is-valid */
import { PostWithUser } from "@lib/types";
import formatDate from "@utils/formatDate";
import formatVotes from "@utils/formatVotes";
import shortenString from "@utils/shortenString";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { ArrowDown, ArrowUp } from "react-feather";

interface Props {
	post: PostWithUser;
}

export default function Post({ post }: Props) {
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated";

	const voteHandler = useCallback(
		(type: string) => async () => {
			if (!isAuthenticated) return;

			const res = await fetch("/api/realm/post/vote", {
				method: "PUT",
				body: JSON.stringify({
					id: post.id,
					type,
				}),
			});

			if (res.ok) {
				window.location.reload();
			}
		},
		[]
	);

	return (
		<div className="grid grid-cols-12 border-1 border-gray-300 rounded-md">
			<div className="bg-gray-300 col-span-1 flex justify-start items-center flex-col space-y-2 py-4">
				<button onClick={voteHandler("increment")}>
					<ArrowUp />
				</button>
				<span>{formatVotes(post.votes)}</span>
				<button onClick={voteHandler("decrement")}>
					<ArrowDown />
				</button>
			</div>
			<a href="#post-modal" className="w-full col-span-11 p-4">
				<input type="checkbox" id="my-modal-4" className="modal-toggle" />
				<div className="modal " id="post-modal">
					<div className="modal-box space-y-10">
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-4">
								<img src={post.user.image ?? ""} className="w-10 rounded-md" alt={`${post.user.name}'s avatar`} />
								<h3 className="opacity-50 mb-4 flex items-center">
									<span className="font-semibold">
										{isAuthenticated && post.user.name === session?.user?.name ? "Me" : post.user.name}
									</span>
								</h3>
							</div>
							<h3>{formatDate(post.createdAt.toString())}</h3>
						</div>
						<div className="space-y-2">
							<h1 className="font-medium text-3xl">{post.title}</h1>
							<p>{post.content}</p>
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<img src={post.user.image ?? ""} className="w-10 rounded-md" alt={`${post.user.name}'s avatar`} />
						<h3 className="opacity-50 mb-4 flex items-center">
							<span className="font-semibold">
								{isAuthenticated && post.user.name === session?.user?.name ? "Me" : post.user.name}
							</span>
						</h3>
					</div>
					<h3>{formatDate(post.createdAt.toString())}</h3>
				</div>
				<div className="space-y-2">
					<h1 className="font-medium">{post.title}</h1>
					<p>{shortenString(post.content, 300)}</p>
				</div>
			</a>
		</div>
	);
}
