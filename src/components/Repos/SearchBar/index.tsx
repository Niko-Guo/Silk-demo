import React from 'react';
import { Input, message } from 'antd';

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
				if (value === '') {
					message.error('Can not search empty username');
					return;
				}
				selectUser(value);
			}}
			enterButton
		/>
	);
};

export default SearchBar;
