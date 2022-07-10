import styles from './Item.module.scss';
import ItemType from './domains/AlgoliaItem/type';

const getBaseUrl = (url: string) => {
	if (!url) return '';

	return `(${url.replace(/(http(s)?:\/\/)|(\/.*)/g, '')})`;
};

type Props = ItemType & {
	idx: number;
};

const BaseURL = ({ url }: { url: string }) => {
	const baseUrl = getBaseUrl(url);
	return <span className={styles.url}>{baseUrl}</span>;
};

const UppperRow = ({ title, url }: ItemType) => {
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

const getHoursDifference = (createdAt: string) => {
	const hoursDifference = Math.floor(
		Math.abs(new Date().getTime() - new Date(createdAt).getTime()) / 36e5
	);

	if (hoursDifference >= 24) {
		const daysAgo = Math.floor(hoursDifference / 24);
		return `${daysAgo} ${daysAgo > 1 ? 'days' : 'day'} ago`;
	}

	return `${hoursDifference} ${hoursDifference > 1 ? 'hours' : 'hour'} ago`;
};

const LowerRow = ({ points, author, num_comments, created_at }: ItemType) => {
	const hoursDifference = getHoursDifference(created_at);

	return (
		<div className={styles['lower-row']}>
			{`${points} points by ${author} ${hoursDifference} | hide | ${' '} ${num_comments} comments `}
		</div>
	);
};

const Item = ({ idx, ...item }: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.idx}>{`${idx}.`}</div>
			<div className={styles['right-side']}>
				<UppperRow {...item} />
				<LowerRow {...item} />
			</div>
		</div>
	);
};

export default Item;
