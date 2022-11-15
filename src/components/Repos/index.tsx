import React, { useState, useEffect } from 'react';
import { Card, Empty } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

import { ProCard } from '@ant-design/pro-components';
import PersonalInfo from './PersonalInfo';
import RepoItem from './RepoItem';
import SearchBar from './SearchBar';

const CardWrapper = styled(ProCard)`
	.ant-pro-card {
		/* margin: 10px; */
	}
`;

const RepoList: React.FC = () => {
	const [userOptions, setUserOptions] = useState<any>();
	const [userSelectedOption, setUserSelectedOption] = useState<any>();

	const fetchAllUsers = async () => {
		const res = await axios.request({
			url: `https://api.github.com/users`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
			params: {
				per_page: 100,
			},
		});

		if (res.status === 200) {
			setUserOptions(
				res.data.map((user) => ({
					label: user.login,
					value: user.login,
				}))
			);
		}
	};

	const userSelectOptionHandler = (value) => {
		setUserSelectedOption(value);
		console.log('SEARCH', userSelectedOption);
	};
	useEffect(() => {
		fetchAllUsers();
	}, []);
	return (
		<CardWrapper split="vertical" style={{ margin: 5 }}>
			<ProCard title="Personal info" colSpan="20%">
				<PersonalInfo userName={userSelectedOption} />
			</ProCard>
			<ProCard split="horizontal">
				<ProCard headerBordered>
					<SearchBar
						options={userOptions}
						selectUser={userSelectOptionHandler}
					/>
				</ProCard>
				<ProCard headerBordered>
					<RepoItem userName={userSelectedOption} />
				</ProCard>
			</ProCard>
		</CardWrapper>
		// <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: 300 }}  description={
		// <div>
		//   No data now, try to <a onClick={() => window.location.reload()}>reload</a> the page.
		// </div>}
		// </Empty>
		// <Empty
		// 	image={Empty.PRESENTED_IMAGE_SIMPLE}
		// 	style={{ margin: 300, fontSize: 20 }}
		// 	description={
		// 		<div>
		// 			No data now, try to{' '}
		// 			<button onClick={() => window.location.reload()}>reload</button> the
		// 			page.
		// 		</div>
		// 	}
		// />
	);
};

export default RepoList;
