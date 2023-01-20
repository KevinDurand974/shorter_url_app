import { PropsWithChildren, useContext, useEffect } from "react"
import useForm from "./useForm"

type Props = Omit<JSX.IntrinsicElements["button"], "type"> &
	PropsWithChildren<{
		autoDisabling?: boolean
	}>

const Button = ({ children, autoDisabling, ...props }: Props) => {
	const { isValid } = useForm()

	const disabled = autoDisabling ? !isValid : false

	return (
		<button type="submit" disabled={disabled} {...props}>
			{children}
		</button>
	)
}

export default Button
