import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
