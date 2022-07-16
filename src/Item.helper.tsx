import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ItemType from './domains/AlgoliaItem/type';
import {
	ALOGLIA_ITEM_ATTR_TITLE,
	ALOGLIA_ITEM_ATTR_URL,
	ALOGLIA_ITEM_ATTR_POINTS,
	ALOGLIA_ITEM_ATTR_AUTHOR,
	ALOGLIA_ITEM_ATTR_NUM_COMMENTS,
	ALOGLIA_ITEM_ATTR_CREATED_AT,
} from './domains/AlgoliaItem/constants';
import styles from './Item.module.scss';
import { useState } from 'react';

export const getHoursDifference = (createdAt: string) => {
	const hoursDifference = Math.floor(
		Math.abs(new Date().getTime() - new Date(createdAt).getTime()) / 36e5
	);

	if (hoursDifference >= 24) {
		const daysAgo = Math.floor(hoursDifference / 24);
		return `${daysAgo} ${daysAgo > 1 ? 'days' : 'day'} ago`;
	}

	return `${hoursDifference} ${hoursDifference > 1 ? 'hours' : 'hour'} ago`;
};

export const getBaseUrl = (url: string) => {
	if (!url) return '';

	return `(${url.replace(/(http(s)?:\/\/)|(\/.*)/g, '')})`;
};

export const BaseURL = ({ url }: { url: string }) => {
	const baseUrl = getBaseUrl(url);
	return <span className={styles.url}>{baseUrl}</span>;
};

type UpperRowType = Pick<
	ItemType,
	typeof ALOGLIA_ITEM_ATTR_TITLE | typeof ALOGLIA_ITEM_ATTR_URL
>;

export const UppperRow = ({ title, url }: UpperRowType) => {
	return (
		<>
			<a
				href={url}
				target="_blank"
				rel="noreferrer"
				className={styles.title}
			>
				{`${title} `}
			</a>
			<BaseURL url={url} />
		</>
	);
};

// type LowerRowType = Pick<
// 	ItemType,
// 	| typeof ALOGLIA_ITEM_ATTR_POINTS
// 	| typeof ALOGLIA_ITEM_ATTR_AUTHOR
// 	| typeof ALOGLIA_ITEM_ATTR_NUM_COMMENTS
// 	| typeof ALOGLIA_ITEM_ATTR_CREATED_AT
// >;

const Portal = ({ children }: any) => {
	const portalElement = document.getElementById('modal-root') as HTMLElement;

	console.log('children?', children);
	return ReactDOM.createPortal(children, portalElement);
};

const EmptyComponent = () => <div />;

const usePortal = ({ component }: { component: React.ElementType }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [openProps, setOpenProps] = useState({});

	const open = <T extends {}>(args: T) => {
		setOpenProps(args);
		setIsOpen(true);
	};

	const close = () => setIsOpen(false);

	console.log(isOpen, 'isOpen');
	if (isOpen) {
		const Component = component;
		return {
			open,
			component: () => <Component close={close} {...openProps} />,
		};
	}

	return { open, component: EmptyComponent };
};

const Test = (props: {
	testProps: boolean;
	objectID: string;
	close: () => void;
}) => {
	return (
		<div onClick={() => props.close()} className={styles.portal}>
			{props.objectID}
		</div>
	);
};

export const LowerRow = ({
	points,
	author,
	num_comments: numComments,
	created_at: createdAt,
	objectID,
}: any) => {
	const hoursDifference = getHoursDifference(createdAt);

	const { component: Modal, open } = usePortal({ component: Test });

	console.log();

	const handleClick = () => {
		open({ testProps: false, objectID });
	};

	return (
		<>
			<div className={styles['lower-row']} onClick={handleClick}>
				{`${points} points by ${author} ${hoursDifference} | hide | ${' '} ${numComments} comments `}
			</div>
			<Portal>
				<Modal />
			</Portal>
		</>
	);
};
