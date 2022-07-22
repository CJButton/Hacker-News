import CommentType from '../domains/AlgoliaComment/type';

const getTotalComments = (comments: CommentType[]): number => {
	let total = comments.length;

	comments.forEach((comment) => {
		if (comment.children.length) {
			total += getTotalComments(comment.children);
		}
	});

	return total;
};

export default getTotalComments;
