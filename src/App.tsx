import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SharedLayout from './pages/SharedLayout';
import AllRepos from './pages/AllRepos';
import RepoDetail from './pages/SingleRepo';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AuthContext from './store/auth-context';

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<Routes>
			{!authCtx.isLoggedIn ? (
				<Route path="/login" element={<Login />} />
			) : (
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path="/repos" element={<AllRepos />} />
					<Route
						path="/repos/:repoOwner/:repoName/:repoId"
						element={<RepoDetail />}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			)}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
