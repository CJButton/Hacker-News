import useWaypoint from '../hooks/useWaypoint';
import styles from './Waypoint.module.scss';

type Props = {
	handleEnter: () => void;
};

const Waypoint = ({ handleEnter }: Props) => {
	const handleOnEnter = async (entries: IntersectionObserverEntry[]) => {
		entries.forEach(async (entry) => {
			if (entry.isIntersecting) {
				handleEnter();
			}
		});
		// setCursor(cursor + 1);
	};

	const { containerRef } = useWaypoint({ handleOnEnter });

	return <div ref={containerRef} className={styles.wrapper} />;
};

export default Waypoint;
