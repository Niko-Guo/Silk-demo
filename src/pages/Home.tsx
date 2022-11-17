import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
;

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 300px;
`;

const Home: React.FC = () => {
	const navigate = useNavigate();

	const [homePageLoading, setHomePageLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setHomePageLoading(false);
		}, 1000);
	}, []);

	return (
		<Spin size="large" spinning={homePageLoading}>
			<HomeWrapper>
				<h1>Welcome</h1>
				<Button
					type="primary"
					onClick={() => {
						navigate('/repos');
					}}
				>
					Get Started
				</Button>
			</HomeWrapper>
		</Spin>
	);
};

export default Home;
