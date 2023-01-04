const useDisabledScroll = () => {
	const trigger = (value: boolean) => {
		const body = document.querySelector("body")

		if (value) {
			if (!body?.classList.contains("overflow-hidden")) {
				body?.classList.add("overflow-hidden")
			}
		} else {
			if (body?.classList.contains("overflow-hidden")) {
				body?.classList.remove("overflow-hidden")
			}
		}
	}

	return [trigger]
}

export default useDisabledScroll
