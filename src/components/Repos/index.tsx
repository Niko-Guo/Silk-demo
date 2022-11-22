import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import PersonalInfo from './PersonalInfo';
import RepoItem from './RepoItem';
import SearchBar from './SearchBar';

const RepoList: React.FC = () => {
	const [userSelectedOption, setUserSelectedOption] = useState('Ky-Ling');

	const userSelectOptionHandler = (value: string) => {
		setUserSelectedOption(value);
	};

	return (
		<ProCard split="vertical" style={{ margin: 5 }}>
			<ProCard title="Personal info" colSpan="20%">
				<PersonalInfo userName={userSelectedOption} />
			</ProCard>
			<ProCard split="horizontal">
				<ProCard headerBordered>
					<SearchBar selectUser={userSelectOptionHandler} />
				</ProCard>
				<ProCard headerBordered>
					<RepoItem userName={userSelectedOption} />
				</ProCard>
			</ProCard>
		</ProCard>
	);
};

export default RepoList;
