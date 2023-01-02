import { useContext } from "react"
import FormContext from "./FormController"

const useForm = () => {
	return useContext(FormContext)
}

export default useForm
