import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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

	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		navigate(`?i=${objectID}`, { replace: true });
	}, [navigate, objectID]);

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

	const handleClose = () => {
		navigate(pathname, { replace: true });
		close();
	};

	return (
		<div className={styles.wrapper}>
			<div className="d-flex justify-content-between">
				<Item
					{...props}
					objectID={objectID}
					className={styles.item}
					isDisabled
				/>
				<Button
					className={styles['close-button']}
					onClick={handleClose}
				>
					X
				</Button>
			</div>
			{comments.map((comment: CommentType) => {
				return <Comment {...comment} key={comment.id} />;
			})}
		</div>
	);
};

export default Comments;
