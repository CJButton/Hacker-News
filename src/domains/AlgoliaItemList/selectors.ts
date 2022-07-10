import { ALGOLIA_ITEMS_ATTR_HITS } from './constants';
import AlgoliaItems from './type';

export const getHits = (items: AlgoliaItems) => items[ALGOLIA_ITEMS_ATTR_HITS];
