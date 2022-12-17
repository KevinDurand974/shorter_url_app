import { useEffect, useState } from "react"

const useHasMounted = () => {
	const [hasMounted, setMount] = useState(false)

	useEffect(() => {
		setMount(true)

		return () => setMount(false)
	}, [])

	return hasMounted
}

export default useHasMounted
