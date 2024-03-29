import { useState } from 'react';
import styles from './usePortal.module.scss';

const usePortal = ({ component }: { component: React.ElementType }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [openProps, setOpenProps] = useState({});

	const open = <T extends {}>(args: T) => {
		setOpenProps(args);
		setIsOpen(true);
	};

	const close = () => setIsOpen(false);

	if (isOpen) {
		const Component = component;

		return {
			open,
			component: (
				<>
					<div className={styles.background}></div>
					<div className={styles.portal}>
						<Component close={close} {...openProps} />
					</div>
				</>
			),
		};
	}

	return { open, component: null };
};

export default usePortal;
