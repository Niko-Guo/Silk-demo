import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { Button, message, Popconfirm, Popover, Tooltip } from 'antd';
import { LoginOutlined, SettingOutlined, KeyOutlined } from '@ant-design/icons';
import AuthContext from '../../store/auth-context';

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
	border-style: none;
	cursor: pointer;
`;

const NavBar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const authCtx = useContext(AuthContext);

	const onConfirm = () => {
		authCtx.logout();
		navigate('/login');
		message.success('Log out successfully!');
	};

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
			<Popover
				content={
					<>
						<Tooltip title="Reset Password">
							<Button
								size="large"
								icon={<KeyOutlined />}
								style={{ borderStyle: 'none' }}
								onClick={() => {
									if (location.pathname.slice(1) === 'reset-password') {
										message.error('Already in the reset password page!');
									} else {
										navigate(`/reset-password`);
									}
								}}
							/>
						</Tooltip>
						<Tooltip title="Log out">
							<Popconfirm
								placement="bottomRight"
								title="Are you sure to logout?"
								onConfirm={onConfirm}
								okText="Yes"
								cancelText="No"
							>
								<LogOutButton
									size="large"
									icon={<LoginOutlined />}
								></LogOutButton>
							</Popconfirm>
						</Tooltip>
					</>
				}
				placement="bottomRight"
				trigger="click"
			>
				<Button icon={<SettingOutlined />} style={{ borderStyle: 'none' }} />
			</Popover>
		</NavBarWrapper>
	);
};

export default NavBar;
