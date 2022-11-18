import React, { useState, useEffect } from 'react';
import { Card, Spin, Pagination, Empty, message } from 'antd';
import { RepoInfo } from '../interface';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import apiService from '../../../service/apiService';

import { EMPTY_STRING_PLACEHOLDER } from '../../../constants/index';
import { RepoItemProps, PaginationType, SearchParams } from './interface';

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

const RepoItem: React.FC<RepoItemProps> = ({ userName }) => {
	const [repoInfo, setRepoInfo] = useState<RepoInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const [pagination, setPagination] = useState<PaginationType>({
		current: 1,
		pageSize: 18,
		total: 1,
	});

	const [searchCondition, setSearchCondition] = useState<SearchParams>();

	const navigate = useNavigate();

	const fetchReposByUsername = async (params: SearchParams) => {
		setIsLoading(true);

		const res = await apiService.getReposByUsername(params);

		if (res.status === 200) {
			setRepoInfo(
				res.data.items.map((item) => ({
					RepoId: item.id,
					RepoOwner: item.owner.login,
					RepoName: item.name,
					RepoDescription: item.description,
				}))
			);

			setSearchCondition(params);

			setPagination({
				current: res.config.params.page,
				pageSize: res.config.params.per_page,
				total: res.data.total_count,
			});

			setIsLoading(false);
		} else {
			message.error(res.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchReposByUsername({
			userName: userName,
			page: pagination.current,
			per_page: pagination.pageSize,
		});
	}, [userName]);

	return (
		<Spin spinning={isLoading} size="large">
			<Wrapper>
				<Container>
					{repoInfo.length ? (
						repoInfo.map((item: RepoInfo) => (
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
					current={pagination.current}
					pageSize={18}
					total={pagination.total}
					onChange={(page) =>
						fetchReposByUsername({ ...searchCondition, page })
					}
					showSizeChanger={false}
				/>
			</Wrapper>
		</Spin>
	);
};

export default RepoItem;
