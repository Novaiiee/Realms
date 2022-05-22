import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
	const { data, status } = useSession();

	return (
		<section>
			<button onClick={() => signIn("github")}>Login</button>
			<h1>{status === "authenticated" && data?.user?.image}</h1>
		</section>
	);
};

export default Home;
