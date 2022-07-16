import axios from 'axios';
import { useEffect } from 'react';

type Props = {
	id: string;
};

const Comments = ({ id }: Props) => {
	const objectID = id;

	useEffect(() => {
		const fetchComments = async () => {
			// https://hn.algolia.com/api/v1/search?tags=comment,story_32082030
			try {
				const { data } = await axios.get(
					`https://hn.algolia.com/api/v1/search?tags=comment,story_${objectID}`
				);
				console.log('data', data);
			} catch (e) {
				console.error(e);
				return [];
			}
		};

		fetchComments();
	}, [objectID]);

	return <div></div>;
};

export default Comments;
