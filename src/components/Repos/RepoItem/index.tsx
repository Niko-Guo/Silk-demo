import React, { useState, useEffect, useCallback } from 'react';
import { Card, Spin, Pagination, Empty } from 'antd';
import { RepoInfo } from '../interface';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import apiService from '../../../service/apiService';

import { EMPTY_STRING_PLACEHOLDER } from '../../../constants/index';

const Wrapper = styled.div`
	.ant-pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	row-gap: 14px;

	.text {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
	}
`;

interface RepoItemProps {
	userName: string;
}

const RepoItem: React.FC<RepoItemProps> = ({ userName }) => {
	const [repoInfo, setRepoInfo] = useState<RepoInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const [total, setTotal] = useState(100);

	const navigate = useNavigate();

	const fetchReposByUsername = useCallback(
		async (userName: string, page: number = 1, per_page: number = 18) => {
			setIsLoading(true);

			const res = await apiService.getReposByUsername(userName, page, per_page);

			if (res.status === 200) {
				setRepoInfo(
					res.data.items.map((item) => ({
						RepoId: item.id,
						RepoOwner: item.owner.login,
						RepoName: item.name,
						RepoDescription: item.description,
					}))
				);
				setTotal(res.data.total_count);

				setIsLoading(false);
			}
		},
		[]
	);

	useEffect(() => {
		fetchReposByUsername(userName);
	}, [userName, fetchReposByUsername]);

	return (
		<Spin spinning={isLoading} size="large">
			<Wrapper>
				<Container>
					{repoInfo.length ? (
						repoInfo.map((item: any) => (
							<Card
								key={item.RepoId}
								hoverable
								style={{ width: 300, height: 150, margin: 'auto' }}
								onClick={() => {
									navigate(
										`/repos/${item.RepoOwner}/${item.RepoName}/${item.RepoId}`
									);
								}}
							>
								<Card.Meta
									title={item?.RepoName ?? EMPTY_STRING_PLACEHOLDER}
									description={
										<p className="text">
											{item?.RepoDescription ?? EMPTY_STRING_PLACEHOLDER}
										</p>
									}
								/>
							</Card>
						))
					) : (
						<Empty className="empty" description="No Repositories" />
					)}
				</Container>

				<Pagination
					className="pagination"
					defaultCurrent={1}
					total={total}
					onChange={(page) => fetchReposByUsername(userName, page)}
					showSizeChanger={false}
				/>
			</Wrapper>
		</Spin>
	);
};

export default RepoItem;
