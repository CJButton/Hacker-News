import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';
import CircleLoader from 'react-spinners/CircleLoader';
import { Waypoint } from 'react-waypoint';
import styles from './InfiniteScroll.module.scss';

const override = css`
	top: 40%;
	display: block;
	margin: auto;
`;

type Props<T> = {
	children: (arg0: T, arg1: number) => ReactNode;
	fetcher: () => Promise<T[]>;
	className?: string;
};

const InfiniteScroll = <T extends {}>({
	children,
	fetcher,
	className = '',
}: Props<T>) => {
	const [cursor, setCursor] = useState(0);
	const [currentItems, setCurrentItems] = useState<T[]>([]);

	useEffect(() => {
		const initialize = async () => {
			const res = await fetcher();
			setCurrentItems(res);
		};
		initialize();
	}, [fetcher]);

	if (!currentItems.length) {
		return (
			<CircleLoader color="rgb(252, 79, 8)" size="150px" css={override} />
		);
	}

	const handleOnEnter = async () => {
		const res = await fetcher();
		setCurrentItems([...currentItems, ...res]);
		setCursor(cursor + 1);
	};

	return (
		<div className={classNames(styles.wrapper, className)}>
			{currentItems.map((item: T, idx: number) => {
				return children(item, idx);
			})}
			<Waypoint
				key={cursor}
				onEnter={handleOnEnter}
				bottomOffset="-20%"
			/>
		</div>
	);
};

export default InfiniteScroll;
