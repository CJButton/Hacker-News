import CommentType from './domains/AlgoliaComment/type';
import getHoursDifference from './services/getHoursDifference';
import styles from './Comment.module.scss';

const Comment = (comment: CommentType) => {
	const hoursDifference = getHoursDifference(comment.created_at);
	const markup = { __html: comment.text };

	const authorText = comment.author ?? 'User Deleted';

	if (!comment.text) {
		return (
			<div className={styles['comment-wrapper']}>
				<div className={styles.header}>
					{`${authorText} ${hoursDifference}`}
				</div>
				<p>Comment Deleted</p>
			</div>
		);
	}

	return (
		<div className={styles['comment-wrapper']}>
			<div className={styles.header}>
				{`${authorText} ${hoursDifference}`}
			</div>
			<div dangerouslySetInnerHTML={markup} />
			{comment.children.map((childComment) => {
				// @ts-ignore
				return <Comment {...childComment} key={childComment.id} />;
			})}
		</div>
	);
};

export default Comment;
