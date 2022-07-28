import ReactDOM from 'react-dom';

const Portal = ({ component }: { component: React.ReactNode }) => {
	const portalElement = document.getElementById('modal-root') as HTMLElement;

	return ReactDOM.createPortal(component, portalElement);
};

export default Portal;
