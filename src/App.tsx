import axios from 'axios';
import Item from './Item';
import InfiniteScroll from './modules/InfiniteScroll/InfiniteScroll';
import ItemType from './domains/AlgoliaItem/type';
import { getHits } from './domains/AlgoliaItemList/selectors';
import styles from './App.module.scss';

const App = () => {
	const fetcher = () => {
		let page = 1;
		return async () => {
			const { data } = await axios.get(
				`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
			);
			page += 1;
			return getHits(data);
		};
	};

	return (
		<div className={styles.wrapper}>
			<InfiniteScroll fetcher={fetcher()}>
				{(item: ItemType, idx: number) => {
					return <Item key={item.objectID} idx={idx + 1} {...item} />;
				}}
			</InfiniteScroll>
		</div>
	);
};

export default App;
