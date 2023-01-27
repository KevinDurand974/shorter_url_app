import { SlLock } from "react-icons/sl"

type Props = {
	className?: string
}

const RestrictedArea = ({ className }: Props) => {
	return (
		<div
			className={`bg-warning/25 z-50 flex justify-center items-center absolute ${className}`}
		>
			<SlLock className="text-warning text-4xl" />
		</div>
	)
}

export default RestrictedArea
