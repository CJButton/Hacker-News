import CommentType from '../AlgoliaComment/type';

type ItemParent = {
	author: string;
	children: CommentType[];
	created_at: string;
	created_at_i: number;
	id: number;
	options: any;
	parent_id: number | null;
	points: number;
	story_id: number | null;
	text: string;
	title: string;
	type: string;
	url: string;
};

export default ItemParent;
