import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemType from './domains/AlgoliaItem/type';
import Item from './Item';
import CommentType from './domains/AlgoliaComment/type';
import Comment from './Comment';
import styles from './Comments.module.scss';
import { useParams } from 'react-router-dom';

type CommentParent = {
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

const Comments = () => {
	const [commentParent, setCommentParent] = useState<CommentParent>();

	const { id } = useParams() as { id: string };

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const { data } = await axios.get<CommentParent>(
					`https://hn.algolia.com/api/v1/items/${id}`
				);
				setCommentParent(data);
			} catch (e) {}
		};
		fetchComments();
	}, [id]);

	if (!commentParent?.children) {
		// TODO: Replace with loader
		return null;
	}

	const { children: comments, text, title, url, ...props } = commentParent;

	const convertedItem: ItemType = {
		...props,
		comment_text: text,
		num_comments: 1,
		objectID: id,
		story_id: parseInt(id),
		story_text: text,
		story_title: null,
		story_url: null,
		title: title,
		url: url,
	};

	return (
		<div className={styles.wrapper}>
			<Item {...convertedItem} />
			{comments.map((comment: CommentType) => {
				return <Comment {...comment} key={comment.id} />;
			})}
		</div>
	);
};

export default Comments;
