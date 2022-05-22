import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/shared/Navbar";

const index: NextPage = () => (
	<>
		<Head>
			<title>Realms</title>
		</Head>
		<main>
			<Navbar />
			<section className="container mx-auto" />
		</main>
	</>
);

export default index;
