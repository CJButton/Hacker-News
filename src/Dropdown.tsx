import { useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';

export type DropdownProp<T> = { value: T; label: string };

type Props<T> = {
	values: DropdownProp<T>[];
	handleChange?: (arg0: DropdownProp<T>) => void;
};

const Dropdown = <T extends {}>({
	values,
	handleChange = () => null,
}: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState<DropdownProp<T>>(values[0]);

	const setValue = (val: DropdownProp<T>) => {
		setActive(val);
		setIsOpen(false);
	};

	useEffect(() => {
		handleChange(active);
	}, [active, handleChange]);

	return (
		<div
			className="ms-2 position-relative"
			tabIndex={1}
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className={styles.value}>{active.label}</div>
			{isOpen && (
				<div className={styles.background}>
					{values.map((val) => {
						return (
							<div
								className={styles.option}
								onClick={() => setValue(val)}
								key={val.label}
							>
								{val.label}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
