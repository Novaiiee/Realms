import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html data-theme="winter">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<div className="font-inter">
					<Main />
					<NextScript />
				</div>
			</body>
		</Html>
	);
}
