import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Dropdown, { DropdownProp } from '../../Dropdown';
import logo from '../../images/y18.gif';
import styles from './Topbar.module.scss';
import { ROUTE_STORIES_LATEST, ROUTE_STORIES_ONE_DAY_AGO } from '../../App';

const values: DropdownProp<string>[] = [
	{ value: ROUTE_STORIES_LATEST, label: 'Newest' },
	{ value: ROUTE_STORIES_ONE_DAY_AGO, label: '24 Hours Ago' },
];

const TopBar = () => {
	const navigate = useNavigate();
	const handleChange = (props: DropdownProp<string>) => {
		const { value } = props;

		navigate(value);
	};

	return (
		<header className={classNames('d-flex', styles.topbar)}>
			<img className={styles.logo} src={logo} alt="logo" />
			<p className="ms-3">Hacker News Infinite</p>
			<Dropdown values={values} handleChange={handleChange} />
		</header>
	);
};

export default TopBar;
