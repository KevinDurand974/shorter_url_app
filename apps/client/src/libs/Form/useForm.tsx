import { useContext } from "react"
import FormContext from "./Form"

const useForm = () => {
	return useContext(FormContext)
}

export default useForm
