import CommentType from './domains/AlgoliaComment/type';
import { CommentTitle } from './Comment.helper';
import styles from './Comment.module.scss';

const Comment = (comment: CommentType) => {
	const markup = { __html: comment.text };

	if (!comment.text) {
		return (
			<div className={styles['comment-wrapper']}>
				<CommentTitle {...comment} />
				<p>Comment Deleted</p>
			</div>
		);
	}

	return (
		<div className={styles['comment-wrapper']}>
			<CommentTitle {...comment} />
			<div dangerouslySetInnerHTML={markup} />
			{comment.children.map((childComment) => {
				// @ts-ignore
				return <Comment {...childComment} key={childComment.id} />;
			})}
		</div>
	);
};

export default Comment;
