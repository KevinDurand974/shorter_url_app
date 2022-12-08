import { PropsWithChildren } from "react"
import { Header, Footer } from "."

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="h-fit">{children}</main>

			<Footer />
		</div>
	)
}

export default Layout
