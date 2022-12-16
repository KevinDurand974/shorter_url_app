import { httpBatchLink, createTRPCProxyClient, loggerLink } from "@trpc/client"

import { AppRouter } from "@shorter/backend"

let authToken: string

const setAuthToken = (token: string) => {
	authToken = token
}

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:8080/trpc",
			fetch: async (url, options) => {
				return fetch(url, { ...options, credentials: "include" })
			},
			headers: () => {
				return {
					Authorization: `Bearer ${authToken}`,
				}
			},
		}),
	],
})

export { trpc, setAuthToken }
