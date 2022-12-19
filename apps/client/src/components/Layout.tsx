import { PropsWithChildren } from "react"
import { Header, Footer, TabSkipMenu } from "."
import useTrpcToken from "@hooks/useTrpcToken"
import useAutoRefreshToken from "@hooks/useAutoRefreshToken"

const Layout = ({ children }: PropsWithChildren) => {
	useTrpcToken()
	useAutoRefreshToken()

	return (
		<div className="flex flex-col min-h-screen p-2 sm:p-4">
			<TabSkipMenu />

			<Header />

			<main className="flex-1 relative max-w-screen-2xl w-full mx-auto">
				{children}
			</main>

			<Footer />
		</div>
	)
}

export default Layout
