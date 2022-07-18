import classNames from 'classnames';
import styles from './Item.module.scss';
import ItemType from './domains/AlgoliaItem/type';
import { UppperRow, LowerRow } from './Item.helper';

type Props = ItemType & {
	idx?: number;
	className?: string;
	isDisabled?: boolean;
};

const Item = ({ idx, className = '', isDisabled = false, ...item }: Props) => {
	return (
		<div className={classNames(styles.wrapper, className)}>
			{idx && <div className={styles.idx}>{`${idx}.`}</div>}
			<div>
				<UppperRow {...item} />
				<LowerRow {...item} isDisabled={isDisabled} />
			</div>
		</div>
	);
};

export default Item;
