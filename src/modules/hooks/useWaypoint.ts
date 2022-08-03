import { useRef, useEffect } from 'react';

type Props = {
	handleOnEnter: (props: IntersectionObserverEntry[]) => void;
};

const useWaypoint = ({ handleOnEnter }: Props) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const current = containerRef.current;
		const observer = new IntersectionObserver(
			(props) => handleOnEnter(props),
			{
				threshold: 0.1,
			}
		);
		if (current) observer.observe(current);

		return () => {
			if (current) observer.unobserve(current);
		};
	}, [handleOnEnter]);

	return { containerRef };
};

export default useWaypoint;
