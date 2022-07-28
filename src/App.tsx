import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comments from './Comments';
import LatestStories from './features/stories/LatestStories';
import OneDayAgoStories from './features/stories/OneDayAgoStories';
import Wrapper from './Wrapper';

export const ROUTE_BASE_STORIES = 'stories';
export const ROUTE_BASE_STORIES_LATEST = 'latest';
export const ROUTE_BASE_STORIES_ONE_DAY_AGO = 'one-day-ago';
export const ROUTE_BASE_ITEM = 'item';

export const ROUTE_STORIES_LATEST = `/${ROUTE_BASE_STORIES}/${ROUTE_BASE_STORIES_LATEST}`;
export const ROUTE_STORIES_ONE_DAY_AGO = `/${ROUTE_BASE_STORIES}/${ROUTE_BASE_STORIES_ONE_DAY_AGO}`;

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={`/${ROUTE_BASE_STORIES}`} element={<Wrapper />}>
					<Route
						path={ROUTE_BASE_STORIES_LATEST}
						element={<LatestStories />}
					/>
					<Route
						path={ROUTE_BASE_STORIES_ONE_DAY_AGO}
						element={<OneDayAgoStories />}
					/>
					<Route
						path={`${ROUTE_BASE_ITEM}/:id`}
						element={<Comments />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
