type Comment = {
	author: string;
	children: Comment[];
	created_at: string;
	created_at_i: number;
	id: number;
	options: [];
	parent_id: number;
	points: number | null;
	story_id: number;
	text: string;
	title: string | null;
	type: string;
	url: string | null;
};

export default Comment;
