import { trpc } from "@libs/trpc"
import { getUserUrlsServer, isAuthServer } from "@libs/trpcSsr"
import { Url } from "@shorter/backend/dist/entities"
import { addHours, format, formatDistanceStrict, isBefore } from "date-fns"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { BiEdit } from "react-icons/bi"
import { HiOutlineEye } from "react-icons/hi2"
import { IoClose } from "react-icons/io5"
import { GoLock } from "react-icons/go"
import { FiCopy } from "react-icons/fi"
import {
	TiArrowUnsorted,
	TiArrowSortedUp,
	TiArrowSortedDown,
} from "react-icons/ti"
import RestrictedArea from "@components/RestrictedArea"

type ServerProps = GetServerSideProps<{
	isLogged: boolean
	urls: Url[]
}>

type SortBy =
	| "id"
	| "generatedUrl"
	| "expireIn"
	| "createdAt"
	| "UpdatedAt"
	| "useCount"
	| "restricted"

type ClientProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ExplorerUrlPage = ({ isLogged, urls }: ClientProps) => {
	const { push } = useRouter()

	const [calledPush, setCalledPush] = useState(false)
	// const [data, setData] = useState<Url[]>(urls)
	const [getFilter, setFilter] = useState<SortBy>("id")
	const [orderAsc, setOrderAsc] = useState<boolean | null>(true)

	useEffect(() => {
		if (!calledPush && !isLogged) {
			push("/login")
			setCalledPush(true)
		}
	}, [calledPush, isLogged, push])

	const createExpireIn = (hours: number, createdAt: Date) => {
		const expirationDate = addHours(new Date(createdAt), hours)
		if (isBefore(expirationDate, new Date())) return "Expired"
		return formatDistanceStrict(expirationDate, new Date(), {
			addSuffix: true,
		})
	}

	const filterBy = (
		data: Url[],
		sortBy: SortBy,
		asc: boolean | null = true
	) => {
		const filterByNumber = (a: number, b: number) => {
			if (a > b) return 1
			if (a < b) return -1
			return 0
		}

		let sort = []

		switch (sortBy) {
			case "id":
				sort = data.sort((curr, prev) => filterByNumber(curr.id, prev.id))
				break
			case "generatedUrl":
				sort = data.sort((curr, prev) => {
					if (curr.generatedUrl > prev.generatedUrl) return 1
					if (curr.generatedUrl < prev.generatedUrl) return -1
					return 0
				})
				break
			case "expireIn":
				sort = data.sort((curr, prev) => {
					const currParsed = addHours(new Date(curr.createdAt), curr.duration)
					const prevParsed = addHours(new Date(prev.createdAt), prev.duration)

					if (isBefore(currParsed, new Date())) return -100

					return filterByNumber(currParsed.getTime(), prevParsed.getTime())
				})
				break
			case "createdAt":
				sort = data.sort((curr, prev) => {
					const currDate = new Date(curr.createdAt).getTime()
					const prevDate = new Date(prev.createdAt).getTime()
					return filterByNumber(currDate, prevDate)
				})
				break
			case "UpdatedAt":
				sort = data.sort((curr, prev) => {
					const currDate = new Date(curr.updatedAt).getTime()
					const prevDate = new Date(prev.updatedAt).getTime()
					return filterByNumber(currDate, prevDate)
				})
				break
			case "useCount":
				sort = data.sort((curr, prev) => {
					const currNb = Number(curr.useCount)
					const prevNb = Number(prev.useCount)
					return filterByNumber(currNb, prevNb)
				})
				break
			case "restricted":
				sort = data.sort((curr, prev) => {
					if (curr.restricted && !prev.restricted) return -1
					if (!curr.restricted && prev.restricted) return 1
					return 0
				})
				break
		}
		if (asc === null) return data
		if (asc) return sort
		return sort.reverse()
	}

	const setFilterIcon = (name: SortBy) => {
		if (getFilter === name) {
			if (orderAsc === null) return <TiArrowUnsorted className="opacity-25" />
			if (orderAsc) return <TiArrowSortedDown />
			if (!orderAsc) return <TiArrowSortedUp />
		}
		return <TiArrowUnsorted className="opacity-25" />
	}

	const handleSortChange = (name: SortBy) => {
		if (getFilter === name) {
			switch (orderAsc) {
				case true:
					setOrderAsc(false)
					break
				case false:
					setOrderAsc(null)
					break
				case null:
					setOrderAsc(true)
					break
			}
		} else {
			setFilter(name)
			setOrderAsc(true)
		}
	}

	return (
		<Fragment>
			<Head>
				<title>My Urls - Url Shorten</title>
				<meta name="description" content="Create an url." />
			</Head>

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex flex-col gap-4 w-full">
				<h1 className="font-fredoka sm:text-3xl text-center">My Urls</h1>

				<div>Url Perso (urlname)</div>

				<div className="bg-t-alt border-4 border-t-alt">
					<div className="table overflow-wrap w-full">
						<div className="table-header-group bg-tertiary font-fredoka tracking-wider text-white text-center">
							<div className="table-cell p-2 border-r border-s-alt w-20">
								<button
									type="button"
									className="flex gap-1 items-center justify-center w-full"
									onClick={() => handleSortChange("id")}
								>
									<span>N°</span>
									{setFilterIcon("id")}
								</button>
							</div>
							<div className="table-cell p-2 border-r border-s-alt">
								<button
									type="button"
									className="flex gap-1 items-center justify-center w-full"
									onClick={() => handleSortChange("generatedUrl")}
								>
									<span>Generated Url</span>
									{setFilterIcon("generatedUrl")}
								</button>
							</div>
							<div className="table-cell p-2 border-r border-s-alt w-40">
								<button
									type="button"
									className="flex gap-1 items-center justify-center w-full"
									onClick={() => handleSortChange("expireIn")}
								>
									<span>Expire In</span>
									{setFilterIcon("expireIn")}
								</button>
							</div>
							<div className="table-cell p-2 border-r border-s-alt w-32">
								<button
									type="button"
									className="flex gap-1 items-center justify-center w-full"
									onClick={() => handleSortChange("createdAt")}
								>
									<span>Created At</span>
									{setFilterIcon("createdAt")}
								</button>
							</div>
							<div className="table-cell p-2 w-80">Actions</div>
						</div>
						<div className="table-row-group">
							{filterBy(urls, getFilter, orderAsc).map((row, index) => (
								<div
									className="table-row odd:bg-primary even:bg-secondary text-white relative"
									key={row.uuid}
								>
									<div className="table-cell p-2 border-r border-s-alt align-middle text-center">
										{row.id}
									</div>
									<div className="table-cell p-2 border-r border-s-alt align-middle">
										kurl.app/{row.generatedUrl}
									</div>
									<div className="table-cell p-2 border-r border-s-alt align-middle text-center">
										{createExpireIn(row.duration, row.createdAt)}
									</div>
									<div className="table-cell p-2 border-r border-s-alt align-middle text-center">
										{format(new Date(row.createdAt), "P")}
									</div>
									<div className="table-cell p-2 text-center">
										<button
											type="button"
											disabled={row.restricted}
											className="text-3xl cta p-2 mr-2 disabled:grayscale disabled:pointer-events-none"
										>
											<FiCopy />
										</button>
										<button type="button" className="text-3xl cta p-2 mr-2">
											<BiEdit />
										</button>
										<button type="button" className="text-3xl cta p-2 mr-2">
											<HiOutlineEye />
										</button>
										<button type="button" className="text-3xl cta p-2">
											<IoClose />
										</button>
									</div>
									{row.restricted ? (
										<RestrictedArea className="inset-y-0 left-0 right-80 " />
									) : null}
								</div>
							))}
						</div>
					</div>
					<div className="p-2">Page IDK</div>
				</div>
			</section>
		</Fragment>
	)
}

export const getServerSideProps: ServerProps = async ({ req }) => {
	try {
		const urls = await getUserUrlsServer(req.headers.cookie)

		return {
			props: {
				isLogged: true,
				urls,
			},
		}
	} catch (err: any) {
		return {
			props: {
				isLogged: false,
				urls: [],
			},
		}
	}
}

export default ExplorerUrlPage
