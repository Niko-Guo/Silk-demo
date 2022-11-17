import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserOptionType } from './interface';
import { ProCard } from '@ant-design/pro-components';
import PersonalInfo from './PersonalInfo';
import RepoItem from './RepoItem';
import SearchBar from './SearchBar';
import apiService from '../../service/apiService';

const RepoList: React.FC = () => {
	const [userOptions, setUserOptions] = useState<UserOptionType[]>();
	const [userSelectedOption, setUserSelectedOption] = useState('mojombo');

	const fetchAllUsers = async () => {
		const res = await apiService.getAllUsers();

		if (res.status === 200) {
			setUserOptions(
				res.data.map((user) => ({
					label: user.login,
					value: user.login,
				}))
			);
		}
	};

	const userSelectOptionHandler = (value: string) => {
		setUserSelectedOption(value);
	};

	useEffect(() => {
		fetchAllUsers();
	}, []);

	return (
		<ProCard split="vertical" style={{ margin: 5 }}>
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
		</ProCard>
	);
};

export default RepoList;
