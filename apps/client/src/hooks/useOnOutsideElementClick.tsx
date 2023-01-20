import { MouseEvent, RefObject, TouchEvent, useEffect } from "react"
import { fromEvent, merge } from "rxjs"

const useOnOutsideElementClick = (
	ref: RefObject<HTMLElement>,
	handler: () => void
) => {
	useEffect(() => {
		const docMouseDown$ = fromEvent<MouseEvent>(document, "mousedown")
		const doctouchstart$ = fromEvent<TouchEvent>(document, "touchstart")

		const sub$ = merge(docMouseDown$, doctouchstart$).subscribe((event) => {
			if (
				ref.current &&
				!(ref.current as HTMLElement).contains(event.target as HTMLElement)
			) {
				handler()
			}
		})

		return () => {
			sub$.unsubscribe()
		}
	}, [handler, ref])
}

export default useOnOutsideElementClick
