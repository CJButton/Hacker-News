import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import ItemType from './domains/AlgoliaItem/type';
import styles from './Comments.module.scss';
import Item from './Item';
import Button from './modules/Buttons/Button';
import getHoursDifference from './services/getHoursDifference';

type Props = {
	close: () => void;
} & ItemType;

const Comments = ({ objectID, close, ...props }: Props) => {
	const [comments, setComments] = useState<any[]>([]);
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const { data } = await axios.get(
					`https://hn.algolia.com/api/v1/search?tags=comment,story_${objectID}`
				);
				setComments(data.hits);
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
			{comments.map((comment) => {
				console.log(comment);
				const hoursDifference = getHoursDifference(comment.created_at);
				const markup = { __html: comment.comment_text };
				return (
					<div className={styles['comment-wrapper']}>
						<div
							className={styles.header}
						>{`${comment.author} ${hoursDifference}`}</div>
						<div dangerouslySetInnerHTML={markup} />
					</div>
				);
			})}
		</div>
	);
};

export default Comments;
