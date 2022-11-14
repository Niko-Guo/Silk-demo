import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Wrapper = styled(Card)``;

const RepoItem: React.FC = () => {
	return (
		<Wrapper>
			<Card hoverable style={{ width: 240 }}>
				<Card.Meta title="Europe Street beat" description="www.instagram.com" />
			</Card>
		</Wrapper>
	);
};

export default RepoItem;
