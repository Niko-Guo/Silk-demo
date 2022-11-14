import React from 'react';
import { Select } from 'antd';

const SearchBar: React.FC = () => {
	return (
		<Select
			showSearch
			size="middle"
			placeholder="Select a user"
			optionFilterProp="children"
			// onChange={onChange}
			// onSearch={onSearch}
			filterOption={(input, option) =>
				(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
			}
			options={[
				{
					value: 'jack',
					label: 'Jack',
				},
				{
					value: 'lucy',
					label: 'Lucy',
				},
				{
					value: 'tom',
					label: 'Tom',
				},
			]}
		/>
	);
};

export default SearchBar;
