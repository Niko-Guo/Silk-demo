import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { ProFormSelect } from '@ant-design/pro-form';
import axios from 'axios';

interface SearchBarProps {
	options: any;
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
			defaultValue={'mojombo'}
			options={options}
		/>
	);
};

export default SearchBar;
