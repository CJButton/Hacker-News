import getTotalComments from './getTotalComments';
import CommentType from '../domains/AlgoliaComment/type';

const baseComment: CommentType = {
	author: '',
	children: [],
	created_at: '',
	created_at_i: 0,
	id: 0,
	options: [],
	parent_id: 0,
	points: 0,
	story_id: 0,
	text: '',
	title: '',
	type: '',
	url: '',
};

describe('getTotalComments', () => {
	it('can count total comments at one level of depth', () => {
		const comments = [
			{ ...baseComment, text: 'A' },
			{ ...baseComment, text: 'B' },
			{ ...baseComment, text: 'C' },
		];
		const total = getTotalComments(comments);

		expect(total).toBe(3);
	});

	it('can count nested comments', () => {
		const subComments = [
			{ ...baseComment, text: 'B' },
			{ ...baseComment, text: 'C' },
			{ ...baseComment, text: 'D' },
		];
		const comments = [{ ...baseComment, text: 'A', children: subComments }];

		const total = getTotalComments(comments);

		expect(total).toBe(4);
	});

	it('can omit empty comments', () => {
		const subComments = [
			{ ...baseComment, text: 'B' },
			{ ...baseComment, text: '' },
			{ ...baseComment, text: '' },
		];
		const comments = [{ ...baseComment, text: 'A', children: subComments }];

		const total = getTotalComments(comments);

		expect(total).toBe(2);
	});
});
