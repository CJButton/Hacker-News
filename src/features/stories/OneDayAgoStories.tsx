import RenderStories from './RenderStories';
import axios from 'axios';
import { getHits } from '../../domains/AlgoliaItemList/selectors';
import AlgoliaItems from '../../domains/AlgoliaItemList/type';

const OneDayAgoStories = () => {
	const fetcher = (() => {
		let page = 1;
		return async () => {
			try {
				const today = new Date();
				today.setDate(today.getDate() - 1);
				const oneDayAgo = Math.floor(today.getTime() / 1000);

				const { data } = await axios.get<AlgoliaItems>(
					`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&numericFilters=created_at_i<${oneDayAgo}`
				);
				page += 1;
				return getHits(data);
			} catch (e) {
				console.error(e);
				return [];
			}
		};
	})();

	return <RenderStories fetcher={fetcher} />;
};

export default OneDayAgoStories;
