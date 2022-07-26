import { useLocation } from 'react-router-dom';
import useEffectOnce from './services/useEffectOnce';
import { parse } from 'query-string';
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	useNavigate,
} from 'react-router-dom';
import Comments from './Comments';
import TopBar from './Topbar';
import LatestStories from './LatestStories';

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

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Wrapper />}>
					<Route path="latest" element={<LatestStories />} />
					<Route path="item/:id" element={<Comments />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
