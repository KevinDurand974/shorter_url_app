import { PropsWithChildren } from "react"
import { Header, Footer } from "."

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col min-h-screen p-2 md:p-4">
			<Header />

			<main className="flex-1 last-section">{children}</main>

			<Footer />
		</div>
	)
}

export default Layout
