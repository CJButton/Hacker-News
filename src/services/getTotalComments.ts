import CommentType from '../domains/AlgoliaComment/type';

const getTotalComments = (comments: CommentType[]): number => {
	let total = comments.reduce((accumulator, comment) => {
		if (comment.text) {
			accumulator += 1;
		}
		return accumulator;
	}, 0);

	comments.forEach((comment) => {
		if (comment.children.length) {
			total += getTotalComments(comment.children);
		}
	});

	return total;
};

export default getTotalComments;
