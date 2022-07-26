import classNames from 'classnames';
import Dropdown from './Dropdown';
import logo from './images/y18.gif';
import styles from './Topbar.module.scss';

const values = ['A', 'B', 'C'];

const TopBar = () => {
	return (
		<header className={classNames('d-flex', styles.topbar)}>
			<img className={styles.logo} src={logo} alt="logo" />
			<p className="ms-3">Hacker News Infinite</p>
			<Dropdown values={values} />
		</header>
	);
};

export default TopBar;
