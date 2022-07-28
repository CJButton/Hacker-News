import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Dropdown, { DropdownProp } from '../../Dropdown';
import logo from '../../images/y18.gif';
import styles from './Topbar.module.scss';
import {
	ROUTE_BASE_STORIES_LATEST,
	ROUTE_BASE_STORIES_ONE_DAY_AGO,
	ROUTE_BASE_STORIES,
} from '../../App';

const TopBar = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const values: DropdownProp<string>[] = useMemo(
		() => [
			{ value: ROUTE_BASE_STORIES_LATEST, label: 'Latest' },
			{ value: ROUTE_BASE_STORIES_ONE_DAY_AGO, label: '24 Hours Ago' },
		],
		[]
	);

	const handleChange = (props: DropdownProp<string>) => {
		const { value } = props;

		navigate(value);
	};

	const defaultValue = useMemo(
		() =>
			values.find((dropdown) => {
				return `/${ROUTE_BASE_STORIES}/${dropdown.value}` === pathname;
			}),
		[pathname, values]
	) as DropdownProp<string>;

	return (
		<header className={classNames('d-flex', styles.topbar)}>
			<img className={styles.logo} src={logo} alt="logo" />
			<p className="ms-3">Hacker News Infinite</p>
			<Dropdown
				values={values}
				handleChange={handleChange}
				defaultValue={defaultValue}
			/>
		</header>
	);
};

export default TopBar;
