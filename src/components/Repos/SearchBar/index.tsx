import React from 'react';
import {  Input } from 'antd';


interface SearchBarProps {
	selectUser: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectUser }) => {
	const { Search } = Input;

	return (
		<Search
			style={{ width: 400 }}
			size="large"
			placeholder="Search by username"
			onSearch={(value: string) => {
				selectUser(value);
			}}
			enterButton
		/>
	);
};

export default SearchBar;
