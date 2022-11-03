import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";

import { AppRouter } from "@shorter/backend";

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:8080/trpc",
		}),
	],
});

export { trpc };