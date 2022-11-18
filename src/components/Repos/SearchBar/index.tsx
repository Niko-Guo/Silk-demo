import React from 'react';
import { Select, Input } from 'antd';

import { UserOptionType } from '../interface';

interface SearchBarProps {
	options: UserOptionType[] | undefined;
	selectUser: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const { options, selectUser } = props;

	const { Search } = Input;
	return (
		// <Select
		// 	showSearch
		// 	size="large"
		// 	placeholder="Select a user"
		// 	optionFilterProp="children"
		// 	onChange={(value) => {
		// 		selectUser(value);
		// 	}}
		// 	filterOption={(
		// 		input: string,
		// 		option: { label: string; name: string } | undefined
		// 	) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
		// 	options={options}
		// />
		<Search
			style={{ width: 400 }}
			size="large"
			placeholder="Search by username"
			onSearch={(value: string) => {
				selectUser(value);
			}}
			enterButton
			// allowClear={true}
		/>
	);
};

export default SearchBar;
