import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const NavBarWrapper = styled.div`
	position: sticky;
	left: 0;
	top: 0;
	height: 80px;
	background-color: white;
	box-shadow: 0 0 8px #ddd;
	display: flex;
	justify-content: space-between;
	padding: 0 40px 0 16px;
	align-items: center;
	border-radius: 2px;
	z-index: 9;

	.navbar {
		margin: 0 auto;
		display: flex;
		gap: 2rem;
		margin-left: 30px;
	}

	.anticon svg {
		display: inline-block;
		width: 30px;
		height: 30px;
	}
`;

const LogOutButton = styled(Button)`
	background-color: #f0f2f5;
	border-style: none;
	cursor: pointer;
`;

const NavBar: React.FC = () => {
	return (
		<NavBarWrapper>
			<Link to="/">
				<h1>React Demo</h1>
			</Link>
			<nav className="navbar">
				<NavLink
					to="/"
					style={({ isActive }) => {
						return { color: isActive ? 'blue' : 'grey' };
					}}
				>
					Home
				</NavLink>
				<NavLink
					to="/repos"
					style={({ isActive }) => {
						return { color: isActive ? 'blue' : 'grey' };
					}}
				>
					Repos
				</NavLink>
			</nav>
			<Popconfirm
				placement="bottomRight"
				title="Are you sure to logout?"
				// onConfirm={confirm}
				okText="Yes"
				cancelText="No"
			>
				<LogOutButton icon={<LoginOutlined />}></LogOutButton>
			</Popconfirm>
		</NavBarWrapper>
	);
};

export default NavBar;
