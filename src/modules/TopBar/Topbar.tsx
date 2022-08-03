import classNames from 'classnames';
import logo from '../../images/y18.gif';
import { DropdownWrapper } from './Topbar.helper';
import styles from './Topbar.module.scss';

const TopBar = () => {
	return (
		<header className={classNames('d-flex', styles.topbar)}>
			<img className={styles.logo} src={logo} alt="logo" />
			<p className="ms-3">Hacker News Infinite</p>
			<DropdownWrapper />
		</header>
	);
};

export default TopBar;
