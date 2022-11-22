import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Spin } from 'antd';
import styled from 'styled-components';

import apiService from '../../../service/apiService';
import { EMPTY_STRING_PLACEHOLDER } from '../../../constants/index';

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

interface PersonalInfoProps {
	userName: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userName }) => {
	const [userInfo, setUserInfo] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUserDetailInfo = useCallback(async (userName: string) => {
		setIsLoading(true);

		const res = await apiService.getUserDetailInfo(userName);

		if (res.status === 200) {
			setUserInfo(res.data);
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUserDetailInfo(userName);
	}, [userName, fetchUserDetailInfo]);

	return (
		<Spin spinning={isLoading}>
			<Wrapper>
				<Avatar size={150} src={userInfo.avatar_url} />
				<h2 className="name">{userInfo.login ?? EMPTY_STRING_PLACEHOLDER}</h2>
				<p>Company: {userInfo.company ?? EMPTY_STRING_PLACEHOLDER}</p>
				<p className="text">Bio: {userInfo.bio ?? EMPTY_STRING_PLACEHOLDER}</p>
				<div className="personal-data">
					<p>Followers: {userInfo.followers ?? EMPTY_STRING_PLACEHOLDER}</p>
					<p>Following: {userInfo.following ?? EMPTY_STRING_PLACEHOLDER}</p>
				</div>
			</Wrapper>
		</Spin>
	);
};

export default PersonalInfo;
