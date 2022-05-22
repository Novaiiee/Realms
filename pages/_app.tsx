import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";

const client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<QueryClientProvider client={client}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
