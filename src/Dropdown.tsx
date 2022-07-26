import { useState } from 'react';
// import classNames from 'classnames';
import styles from './Dropdown.module.scss';

type Props<T> = {
	values: T[];
};

const Dropdown = <T extends {}>({ values }: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState<T>(values[0]);

	const setValue = (val: T) => {
		setActive(val);
		setIsOpen(false);
	};

	return (
		<div className="ms-2 position-relative">
			<div className={styles.value} onClick={() => setIsOpen(!isOpen)}>
				{active}
			</div>
			{isOpen && (
				<div className={styles.background}>
					{values.map((val) => {
						return (
							<div
								className={styles.option}
								onClick={() => setValue(val)}
							>
								{val}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
