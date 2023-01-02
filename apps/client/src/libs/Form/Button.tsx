import { PropsWithChildren, useContext, useEffect } from "react"
import useForm from "./useForm"

type Props = JSX.IntrinsicElements["button"] & PropsWithChildren<{}>

const Button = ({ children, ...props }: Props) => {
	const { isValid } = useForm()

	return (
		<button disabled={!isValid} {...props}>
			{children}
		</button>
	)
}

export default Button
