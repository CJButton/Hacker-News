import { useLocation } from 'react-router-dom';
import useEffectOnce from './services/useEffectOnce';
import { parse } from 'query-string';
import { Outlet, useNavigate } from 'react-router-dom';
import TopBar from './modules/TopBar/Topbar';

const Wrapper = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	const { i } = parse(search);

	useEffectOnce(() => {
		if (i) {
			navigate(`item/${i}`);
		}
	});

	return (
		<>
			<TopBar />
			<Outlet />
		</>
	);
};

export default Wrapper;
