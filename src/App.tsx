import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SharedLayout from './pages/SharedLayout';
import AllRepos from './pages/AllRepos';
import RepoDetail from './pages/SingleRepo';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route index element={<Home />} />
				<Route path="/repos" element={<AllRepos />} />
				<Route
					path="/repos/:repoOwner/:repoName/:repoId"
					element={<RepoDetail />}
				/>
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
