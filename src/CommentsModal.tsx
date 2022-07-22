import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemType from './domains/AlgoliaItem/type';
import Item from './Item';
import Button from './modules/Buttons/Button';
import CommentType from './domains/AlgoliaComment/type';
import Comment from './Comment';
import styles from './CommentsModal.module.scss';

type Props = {
	close: () => void;
} & ItemType;

const Comments = ({ objectID, close, ...props }: Props) => {
	const [comments, setComments] = useState<CommentType[]>([]);
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const { data } = await axios.get(
					`https://hn.algolia.com/api/v1/items/${objectID}`
				);
				setComments(data.children);
			} catch (e) {
				// TODO: error handling
				console.error(e);
				return [];
			}
		};

		fetchComments();
	}, [objectID]);

	return (
		<div className={styles.wrapper}>
			<div className="d-flex justify-content-between">
				<Item
					{...props}
					objectID={objectID}
					className={styles.item}
					isDisabled
				/>
				<Button className={styles['close-button']} onClick={close}>
					X
				</Button>
			</div>
			{comments.map((comment: CommentType) => {
				return <Comment {...comment} />;
			})}
		</div>
	);
};

export default Comments;
