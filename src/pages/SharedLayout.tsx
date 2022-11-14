import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const SharedLayout: React.FC = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default SharedLayout;
