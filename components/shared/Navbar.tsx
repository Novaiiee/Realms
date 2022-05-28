import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
	const { data: session, status } = useSession();

	const isAuthenticated = status === "authenticated";

	return (
		<div className="navbar bg-white container mx-auto py-5 shadow-sm px-0">
			<div className="flex-1 navbar-start">
				<a className="text-xl font-semibold" href="/">
					Realms
				</a>
			</div>
			<div className="navbar-center flex-2 flex justify-center">
				<SearchBar />
			</div>
			<div className="navbar-end flex-1">
				{!isAuthenticated && (
					<button onClick={() => signIn()} className="btn btn-primary">
						Login
					</button>
				)}
				{isAuthenticated && (
					<div className="dropdown dropdown-end space-y-2">
						<div className="flex items-center space-x-8">
							<img className="rounded-md w-12" tabIndex={0} src={session?.user?.image ?? ""} alt="Your profile pic" />
						</div>
						<ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-md w-52 space-y-6">
							<li>
								<Link href="/account">Account</Link>
								<Link href="/purchases">Order History</Link>
							</li>
							<li>
								<button className="btn text-white" onClick={() => signOut()}>
									Sign Out
								</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
