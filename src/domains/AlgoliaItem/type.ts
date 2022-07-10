type Item = {
	author: string;
	comment_text: string | null;
	created_at: string;
	created_at_i: number;
	num_comments: number;
	objectID: string;
	parent_id: number | null;
	points: number;
	story_id: number;
	story_text: string | null;
	story_title: string | null;
	story_url: string | null;
	title: string;
	url: string;
};

export default Item;
