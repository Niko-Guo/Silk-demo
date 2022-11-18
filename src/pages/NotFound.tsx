import React, { useContext } from 'react';
import { Button, message } from 'antd';
import styled from 'styled-components';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Wrapper = styled.div`
	flex: 0 1 auto;
	justify-self: center;
	align-self: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-top: 200px;
`;
const Title = styled.div`
	display: flex;

	align-items: center;

	margin-left: -230px;
`;
const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const location = useLocation();

	if (!authCtx.isLoggedIn) {
		message.error('Please login first!');
		return <Navigate to='/login'/>
	} else if (authCtx.isLoggedIn && location.pathname.slice(1) === 'login') {
		message.error('Please logout first!');
	}

	return (
		<Wrapper>
			<Title>
				<h1 className="text num">whoops!</h1>&nbsp;&nbsp;
				<h2 className="text word">Load page failed</h2>
			</Title>
			<div className="right">
				<p className="title">
					The website you want to visit could not be found, the reasons may be
					as follows:
				</p>
				<ul>
					<li>The searched website address is misspelled or formatted</li>
					<li>Maybe this page has been deleted</li>
					<li>Page is too popular, too many people are visiting</li>
				</ul>
				<p className="title2">You can try the following: </p>
				<Button
					type="default"
					onClick={() => {
						navigate(-1);
					}}
				>
					Go Back
				</Button>
				&nbsp;
				<Button
					type="primary"
					onClick={() => {
						window.location.reload();
					}}
				>
					Reload
				</Button>
			</div>
		</Wrapper>
	);
};
export default NotFound;
