import { PropsWithChildren } from "react"
import { Header, Footer, TabSkipMenu } from "."

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col min-h-screen p-2 sm:p-4">
			<TabSkipMenu />

			<Header />

			<main className="flex-1 relative">{children}</main>

			<Footer />
		</div>
	)
}

export default Layout
