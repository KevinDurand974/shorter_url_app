import { HiUserCircle } from "react-icons/hi2"

const Account = () => {
	return (
		<div className="relative">
			<button
				type="button"
				className="custom-underline flex flex-wrap items-center sm:gap-2 sm:px-2"
				aria-label="Account"
			>
				<HiUserCircle className="h-5 w-5 sm:h-7 sm:w-7" />
				<span className="hidden sm:block">Account</span>
			</button>
		</div>
	)
}

export default Account
