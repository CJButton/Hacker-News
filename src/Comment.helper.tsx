import CommentType from './domains/AlgoliaComment/type';
import getHoursDifference from './services/getHoursDifference';
import {
	ALGOLIA_COMMENT_ATTR_AUTHOR,
	ALGOLIA_COMMENT_ATTR_CREATED_AT,
} from './domains/AlgoliaComment/constants';
import styles from './Comment.module.scss';

type CommentTitleType = Pick<
	CommentType,
	typeof ALGOLIA_COMMENT_ATTR_AUTHOR | typeof ALGOLIA_COMMENT_ATTR_CREATED_AT
>;

export const CommentTitle = ({
	author,
	created_at: createdAt,
}: CommentTitleType) => {
	const hoursDifference = getHoursDifference(createdAt);

	const authorText = author ?? 'User Deleted';

	return (
		<div className={styles.header}>
			{`${authorText} ${hoursDifference}`}
		</div>
	);
};
