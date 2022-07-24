import { useEffect, EffectCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	useNavigate,
} from 'react-router-dom';
import Comments from './Comments';
import LatestStories from './LatestStories';

const useEffectOnce = (callback: EffectCallback) =>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, []);

const Wrapper = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	const { i } = parse(search);

	useEffectOnce(() => {
		if (i) {
			navigate(`item/${i}`);
		}
	});

	return <Outlet />;
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
