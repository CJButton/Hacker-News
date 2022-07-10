import styles from './Item.module.scss';
import ItemType from './domains/AlgoliaItem/type';
import { UppperRow, LowerRow } from './Item.helper';

type Props = ItemType & {
	idx: number;
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
