import Item from '../../Item';
import InfiniteScroll from '../../modules/InfiniteScroll/InfiniteScroll';
import ItemType from '../../domains/AlgoliaItem/type';
import styles from './RenderStories.module.scss';

type Props = {
	fetcher: () => Promise<ItemType[]>;
};

const RenderStories = ({ fetcher }: Props) => {
	return (
		<div className={styles.wrapper}>
			<InfiniteScroll fetcher={fetcher}>
				{(item: ItemType, idx: number) => {
					return <Item key={item.objectID} idx={idx + 1} {...item} />;
				}}
			</InfiniteScroll>
		</div>
	);
};

export default RenderStories;
