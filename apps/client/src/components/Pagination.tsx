import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb"

type Props = {
	data: unknown[]
	maxItemPerPage: number
	currentPage: number
	onPageChange?: (page: number) => void
	alwaysShowFirstPage?: boolean
	alwaysShowLastPage?: boolean
}

const Pagination = ({
	data,
	maxItemPerPage,
	currentPage,
	alwaysShowFirstPage,
	alwaysShowLastPage,
	onPageChange,
}: Props) => {
	const pageNb = Math.ceil(data.length / maxItemPerPage)

	const changePage = (page: number) => {
		if (page <= 1) {
			if (onPageChange) onPageChange(1)
		} else if (page >= pageNb) {
			if (onPageChange) onPageChange(pageNb)
		} else {
			if (onPageChange) onPageChange(page)
		}
	}

	const styleActive = "bg-accent/25"
	const styleBase = "bg-s-alt"

	if (pageNb <= 10) {
		return (
			<div className="flex gap-2 justify-end flex-wrap">
				<button
					type="button"
					disabled={currentPage === 1}
					className="bg-s-alt border-2 border-accent p-2 min-w-[36px] min-h-[36px] font-fredoka disabled:grayscale disabled:pointer-events-none"
					onClick={() => changePage(currentPage - 1)}
				>
					<TbArrowBigLeft />
				</button>
				{Array(pageNb)
					.fill(1)
					.map((n, index) => (
						<button
							key={index}
							type="button"
							className={`border-2 border-accent p-2 min-w-[36px] min-h-[36px] font-fredoka text-xs ${
								currentPage == index + 1 ? styleActive : styleBase
							}`}
							onClick={() => changePage(index + 1)}
						>
							{index + 1}
						</button>
					))}
				<button
					type="button"
					disabled={currentPage === pageNb}
					className="bg-s-alt border-2 border-accent p-2 min-w-[36px] min-h-[36px] font-fredoka disabled:grayscale disabled:pointer-events-none"
					onClick={() => changePage(currentPage + 1)}
				>
					<TbArrowBigRight />
				</button>
			</div>
		)
	} else {
		return (
			<div className="flex gap-1">
				{Array(pageNb)
					.fill(1)
					.map((n, index) => (
						<button key={index} type="button">
							{index + 1}
						</button>
					))}
			</div>
		)
	}
}

export default Pagination
