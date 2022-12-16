import { httpBatchLink, createTRPCProxyClient } from "@trpc/client"

import { AppRouter } from "@shorter/backend"

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:8080/trpc",
			fetch(url, options) {
				return fetch(url, { ...options, credentials: "include" })
			},
		}),
	],
})

export { trpc }
