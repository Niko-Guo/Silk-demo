import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import styled from 'styled-components';
// import apiService from '@/service/apiService';
import apiService from '../../../service/apiService';
import axios from 'axios';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.name {
		margin-top: 10px;
	}

	.personal-data {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 3rem;
	}

	.text {
		text-align: center;
	}
`;

interface userInfo {
	name: string;
	company: string;
	bio: string;
	followers: number;
	following: number;
	stars: number;
}

interface PersonalInfoProps {
	userName: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userName }) => {
	const [userInfo, setUserInfo] = useState<any>([]);

	const fetchUserDetailInfo = async (userName: string) => {
		// const res = await apiService.getUserDetailInfo({ userName });
		const res = await axios.request({
			url: `https://api.github.com/users/${userName}`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});

		if (res.status === 200) {
			setUserInfo(res.data);
		}
	};

	useEffect(() => {
		fetchUserDetailInfo(userName);
	}, [userName]);

	return (
		<Wrapper>
			<Avatar size={150} src={userInfo.avatar_url} />
			<h2 className="name">{userInfo.login ?? '--'}</h2>
			<p>Company: {userInfo.company ?? '--'}</p>
			<p className="text">Bio: {userInfo.bio ?? '--'}</p>
			<div className="personal-data">
				<p>Followers: {userInfo.followers ?? '--'}</p>
				<p>Following: {userInfo.following ?? '--'}</p>
				{/* <p>{userInfo.stars}</p> */}
			</div>
		</Wrapper>
	);
};

export default PersonalInfo;
