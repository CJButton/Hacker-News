import CommentType from './domains/AlgoliaComment/type';
import getHoursDifference from './services/getHoursDifference';
import styles from './Comment.module.scss';

const Comment = (comment: CommentType) => {
	const hoursDifference = getHoursDifference(comment.created_at);
	const markup = { __html: comment.text };

	return (
		<div className={styles['comment-wrapper']}>
			<div
				className={styles.header}
			>{`${comment.author} ${hoursDifference}`}</div>
			<div dangerouslySetInnerHTML={markup} />
			{comment.children.map((childComment) => {
				// @ts-ignore
				return <Comment {...childComment} key={childComment.id} />;
			})}
		</div>
	);
};

export default Comment;
