import RenderStories from './RenderStories';
import axios from 'axios';
import { getHits } from '../../domains/AlgoliaItemList/selectors';
import AlgoliaItems from '../../domains/AlgoliaItemList/type';

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

	return <RenderStories fetcher={fetcher} />;
};

export default LatestStories;
