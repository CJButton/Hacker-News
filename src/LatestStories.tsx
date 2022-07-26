import axios from 'axios';
import Item from './Item';
import InfiniteScroll from './modules/InfiniteScroll/InfiniteScroll';
import ItemType from './domains/AlgoliaItem/type';
import { getHits } from './domains/AlgoliaItemList/selectors';
import AlgoliaItems from './domains/AlgoliaItemList/type';
import styles from './LatestStories.module.scss';

// const oneDayAgoFetcher = (() => {
// 	let page = 1;
// 	return async () => {
// 		try {
// 			const today = new Date();
// 			today.setDate(today.getDate() - 1);
// 			const oneDayAgo = Math.floor(today.getTime() / 1000);

// 			const { data } = await axios.get<AlgoliaItems>(
// 				`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&numericFilters=created_at_i<${oneDayAgo}`
// 			);
// 			page += 1;
// 			return getHits(data);
// 		} catch (e) {
// 			console.error(e);
// 			return [];
// 		}
// 	};
// })();

const LatestStories = () => {
	const fetcher = (() => {
		let page = 1;
		return async () => {
			try {
				const { data } = await axios.get<AlgoliaItems>(
					`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
				);
				page += 1;
				return getHits(data);
			} catch (e) {
				console.error(e);
				return [];
			}
		};
	})();

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

export default LatestStories;
