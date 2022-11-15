import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SharedLayout from './pages/SharedLayout';
import AllRepos from './pages/AllRepos';
import RepoDetail from './pages/SingleRepo';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// const Home = React.lazy(() => import('./pages/Home'));
// const Login = React.lazy(() => import('./pages/Login'));
// const AllRepos = React.lazy(() => import('./pages/AllRepos'));
// const RepoDetail = React.lazy(() => import('./pages/RepoDetail'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
// const SharedLayout = React.lazy(() => import('./pages/SharedLayout'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route index element={<Home />} />
				<Route path="/repos" element={<AllRepos />} />
				<Route path="/repos/:repoOwner/:repoName/:repoId" element={<RepoDetail />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
