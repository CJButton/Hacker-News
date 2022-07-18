import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export const BUTTON_STYLE_CLEAR = 'clear';

type BUTTON_STYLES = typeof BUTTON_STYLE_CLEAR;

type Props = {
	children: ReactNode;
	onClick: () => void;
	className?: string;
	style?: BUTTON_STYLES;
};

const Button = ({
	children,
	onClick,
	className = '',
	style = BUTTON_STYLE_CLEAR,
}: Props) => {
	return (
		<button
			className={classNames(styles[style], className)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
