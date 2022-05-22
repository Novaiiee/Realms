import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "react-feather";
import { PostWithUser } from "../../lib/types";
import formatVotes from "../../utils/formatVotes";
import shortenString from "../../utils/shortenString";

interface Props {
	post: PostWithUser;
}

export default function Post({ post }: Props) {
	const { data: session, status } = useSession();

	const isAuthenticated = status === "authenticated";

	return (
		<Link href={`/community/${post.community.id}/post?postId=${post.id}`}>
			<div className="grid grid-cols-12 border-1 border-gray-300 rounded-md">
				<div className="bg-gray-300 col-span-1 flex justify-start items-center flex-col space-y-2 py-4">
					<button>
						<ArrowUp />
					</button>
					<span>{formatVotes(post.votes)}</span>
					<button>
						<ArrowDown />
					</button>
				</div>
				<div className="col-span-11 p-4">
					<h3 className="opacity-50 mb-4">
						Posted by{" "}
						<span className="font-semibold">
							{isAuthenticated && post.user.name === session?.user?.name ? "Me" : post.user.name}
						</span>
					</h3>
					<div className="space-y-2">
						<h1 className="font-medium">{post.title}</h1>
						<p>{shortenString(post.content, 300)}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
