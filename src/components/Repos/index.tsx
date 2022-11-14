import React from 'react';
import { Card, Empty } from 'antd';
import styled from 'styled-components';

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
	return (
		// <CardWrapper split="vertical">
		// 	<ProCard title="Personal info" colSpan="25%">
		// 		<PersonalInfo />
		// 	</ProCard>
		// 	<ProCard split="horizontal">
		// 		<ProCard headerBordered>
		// 			<SearchBar />
		// 		</ProCard>
		// 		<ProCard headerBordered>
		// 			<div style={{ height: 360 }}>
		// 				<RepoItem />
		// 			</div>
		// 		</ProCard>
		// 	</ProCard>
		// </CardWrapper>
		// <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: 300 }}  description={
		// <div>
		//   No data now, try to <a onClick={() => window.location.reload()}>reload</a> the page.
		// </div>}
		// </Empty>
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			style={{ margin: 300, fontSize: 20 }}
			description={
				<div>
					No data now, try to{' '}
					<button onClick={() => window.location.reload()}>reload</button> the
					page.
				</div>
			}
		/>
	);
};

export default RepoList;
