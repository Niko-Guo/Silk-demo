import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  // inline-height: 10px;

	.name {
		margin-top: 10px;
	}



	.personal-data {
		display: flex;
		justify-content: center;
		align-items: center;
    gap: 3rem
	}
`;

const PersonalInfo: React.FC = () => {
	return (
		<Wrapper>
			<Avatar size={150} icon={<UserOutlined />} />
			<h2 className="name">Brian Yu</h2>
			<p>Company</p>
			<p>Bio</p>
			<div className="personal-data">
				<p>Followers</p>
				<p>Following</p>
				<p>Stars</p>
			</div>
		</Wrapper>
	);
};

export default PersonalInfo;
