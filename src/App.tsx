import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comments from './Comments';
import LatestStories from './LatestStories';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LatestStories />} />
				<Route path="/article/:id" element={<Comments />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
