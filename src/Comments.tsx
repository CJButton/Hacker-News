import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import ItemType from './domains/AlgoliaItem/type';
import Item from './Item';
import CommentType from './domains/AlgoliaComment/type';
import Comment from './Comment';
import styles from './Comments.module.scss';
import { useParams } from 'react-router-dom';
import ItemParent from './domains/AlgoliaItems/type';
import getTotalComments from './services/getTotalComments';

const Comments = () => {
	const [commentParent, setCommentParent] = useState<ItemParent>();

	const { id } = useParams() as { id: string };

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const { data } = await axios.get<ItemParent>(
					`https://hn.algolia.com/api/v1/items/${id}`
				);
				setCommentParent(data);
			} catch (e) {}
		};
		fetchComments();
	}, [id]);

	const totalComments = useMemo(
		() => getTotalComments(commentParent?.children ?? []),
		[commentParent?.children]
	);

	if (!commentParent?.children) {
		// TODO: Replace with loader
		return null;
	}

	const { children: comments, text, title, url, ...props } = commentParent;

	const convertedItem: ItemType = {
		...props,
		comment_text: text,
		num_comments: totalComments,
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
