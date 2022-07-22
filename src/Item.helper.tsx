import classNames from 'classnames';
import ItemType from './domains/AlgoliaItem/type';
import {
	ALOGLIA_ITEM_ATTR_TITLE,
	ALOGLIA_ITEM_ATTR_URL,
	ALOGLIA_ITEM_ATTR_POINTS,
	ALOGLIA_ITEM_ATTR_AUTHOR,
	ALOGLIA_ITEM_ATTR_NUM_COMMENTS,
	ALOGLIA_ITEM_ATTR_CREATED_AT,
} from './domains/AlgoliaItem/constants';
import usePortal from './modules/hooks/usePortal';
import Button, { BUTTON_STYLE_CLEAR } from './modules/Buttons/Button';
import Portal from './modules/Portal';
import getHoursDifference from './services/getHoursDifference';
import getBaseUrl from './services/getBaseUrl';
import CommentsModal from './CommentsModal';
import styles from './Item.module.scss';

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

type LowerRowType = Pick<
	ItemType,
	| typeof ALOGLIA_ITEM_ATTR_POINTS
	| typeof ALOGLIA_ITEM_ATTR_AUTHOR
	| typeof ALOGLIA_ITEM_ATTR_NUM_COMMENTS
	| typeof ALOGLIA_ITEM_ATTR_CREATED_AT
> & { isDisabled: boolean };

const CommentsButton = ({ isDisabled = false, ...props }: LowerRowType) => {
	const { component: Modal, open } = usePortal({ component: CommentsModal });

	const handleClick = () => {
		open({ ...props });
	};

	const commentsText =
		props[ALOGLIA_ITEM_ATTR_NUM_COMMENTS] > 1 ? 'comments' : 'comment';

	if (isDisabled) {
		return (
			<div className="ms-1">
				{`${props[ALOGLIA_ITEM_ATTR_NUM_COMMENTS]} ${commentsText}`}
			</div>
		);
	}

	return (
		<>
			<Button onClick={handleClick} style={BUTTON_STYLE_CLEAR}>
				{`${props[ALOGLIA_ITEM_ATTR_NUM_COMMENTS]} ${commentsText}`}
			</Button>
			<Portal component={<Modal />} />
		</>
	);
};

export const LowerRow = ({ ...props }: LowerRowType) => {
	const hoursDifference = getHoursDifference(props.created_at);

	return (
		<div className={classNames('d-flex', styles['lower-row'])}>
			{`${props.points} points by ${
				props.author
			} ${hoursDifference} | hide | ${' '}`}
			<CommentsButton {...props} />
		</div>
	);
};
