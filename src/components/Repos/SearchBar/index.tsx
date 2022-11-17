import React from 'react';
import { Select } from 'antd';

import { UserOptionType } from '../interface';

interface SearchBarProps {
	options: UserOptionType[] | undefined;
	selectUser: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const { options, selectUser } = props;

	return (
		<Select
			showSearch
			size="large"
			placeholder="Select a user"
			optionFilterProp="children"
			onChange={(value) => {
				selectUser(value);
			}}
			filterOption={(
				input: string,
				option: { label: string; name: string } | undefined
			) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
			options={options}
		/>
	);
};

export default SearchBar;
