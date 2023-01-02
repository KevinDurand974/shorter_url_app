import useForm from "./useForm"

type Props = JSX.IntrinsicElements["div"] & {
	name: string
}

const ErrorMessage = ({ name, ...props }: Props) => {
	const { getError } = useForm()
	const message = getError(name)

	if (!message) return null

	return <div {...props}>{message}</div>
}

export default ErrorMessage
