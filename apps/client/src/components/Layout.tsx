import { PropsWithChildren } from "react"
import { Header, Footer } from "."

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col h-screen p-2 md:p-4">
			<Header />

			<main className="h-full">{children}</main>

			<Footer />
		</div>
	)
}

export default Layout
