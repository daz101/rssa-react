import { useEffect, useState } from "react";

export const useMousePosition = () => {
	const [positions, setPositions] = useState([]);
	useEffect(() => {
		const setFromEvent = (e) => setPositions(positions =>
			[...positions, {
				clientX: e.clientX, clientY: e.clientY,
				pageX: e.pageX, pageY: e.pageY, timestamp: e.timeStamp
			}]
		);
		window.addEventListener("mousemove", setFromEvent);

		return () => {
			window.removeEventListener("mousemove", setFromEvent);
		};
	}, []);

	return positions;
}

export function withMousePositionHook(Component) {
	return function WrappedComponent(props) {
		const posHook = useMousePosition();
		return <Component {...props} mousePositionHook={posHook} />;
	}
}
