import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../../service/apiService';
import {
	Statistic,
	Divider,
	Card,
	Avatar,
	Timeline,
	List,
	Button,
	Tag,
} from 'antd';

import { ProCard } from '@ant-design/pro-components';
import styled from 'styled-components';
import {
	UserOutlined,
	FolderOpenFilled,
	FileTextOutlined,
} from '@ant-design/icons';

import RcResizeObserver from 'rc-resize-observer';
import { EMPTY_STRING_PLACEHOLDER } from '../../../constants/index';
import { dateFormat } from '../../../utilities/index';
import { ContributorsType, fileDetailType } from './interface';

const Wrapper = styled.div`
	display: flex;

	justify-content: flex-start;
	gap: 10px;
`;

const ListWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;

const RepoDetail: React.FC = () => {
	const [repoDetailInfo, setRepoDetailInfo] = useState<any>([]);
	const [contributors, setContributors] = useState<ContributorsType[]>([]);
	const [fileDetail, setFileDetail] = useState<fileDetailType[]>([]);
	const [responsive, setResponsive] = useState(false);
	const { repoOwner, repoName } = useParams();

	const fetchRepoDetailInfo = async (repoOwner?: string, repoName?: string) => {
		const res = await apiService.getRepoDetailInfo(repoOwner, repoName);

		if (res.status === 200) {
			setRepoDetailInfo(res.data);
		}
	};

	const fetchContributors = async (repoOwner?: string, repoName?: string) => {
		const res = await apiService.getContributors(repoOwner, repoName);

		if (res.status === 200) {
			setContributors(
				res.data
					.map((item) => ({
						name: item.login,
						avatar_url: item.avatar_url,
					}))
					.slice(0, 15)
			);
		}
	};

	const fetchCodeBaseInfo = async (repoOwner?: string, repoName?: string) => {
		const res = await apiService.getCodeBaseInfo(repoOwner, repoName);

		if (res.status === 200) {
			setFileDetail(
				res.data
					.map((item) => ({
						name: item.name,
						fileType: item.type,
					}))
					.sort((a, b) =>
						a.fileType < b.fileType ? -1 : a.fileType > b.fileType ? 1 : 0
					)
			);
		}
	};

	useEffect(() => {
		fetchRepoDetailInfo(repoOwner, repoName);
		fetchContributors(repoOwner, repoName);
		fetchCodeBaseInfo(repoOwner, repoName);
	}, [repoOwner, repoName]);

	return (
		<div style={{ padding: 20, background: '#f0f2f5' }}>
			<RcResizeObserver
				key="resize-observer"
				onResize={(offset) => {
					setResponsive(offset.width < 596);
				}}
			>
				<ProCard.Group
					title={` ${repoOwner} / ${repoName} `}
					subTitle={
						<Tag style={{ marginLeft: 8 }}>
							{repoDetailInfo?.private === false ? 'Public' : 'Private'}
						</Tag>
					}
					direction={responsive ? 'column' : 'row'}
				>
					<ProCard>
						<Statistic
							title="Open Issues"
							value={repoDetailInfo?.open_issues_count}
						/>
					</ProCard>
					<Divider type={responsive ? 'horizontal' : 'vertical'} />
					<ProCard>
						<Statistic
							title="Watchers"
							value={repoDetailInfo?.watchers_count}
						/>
					</ProCard>
					<Divider type={responsive ? 'horizontal' : 'vertical'} />
					<ProCard>
						<Statistic title="Forks" value={repoDetailInfo?.forks_count} />
					</ProCard>
					<Divider type={responsive ? 'horizontal' : 'vertical'} />
					<ProCard>
						<Statistic
							title="Subscribers"
							value={repoDetailInfo?.subscribers_count}
						/>
					</ProCard>
				</ProCard.Group>
			</RcResizeObserver>

			<ProCard
				split={responsive ? 'horizontal' : 'vertical'}
				bordered
				headerBordered
				style={{ marginTop: 10 }}
			>
				<ProCard title="Code" colSpan="50%">
					<div>
						<List
							header={
								<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
									<Avatar src={repoDetailInfo?.owner?.avatar_url} />
									<div>
										Pushed at{' '}
										{dateFormat(repoDetailInfo?.pushed_at) ??
											EMPTY_STRING_PLACEHOLDER}
									</div>
									<div style={{ marginLeft: 380, fontWeight: 'bold' }}>
										{repoDetailInfo?.language}
									</div>
								</div>
							}
							bordered
							dataSource={fileDetail.map((item) => item.name)}
							renderItem={(item: any, index) => (
								<List.Item key={index}>
									<ListWrapper>
										{fileDetail.find((fileItem) => fileItem.name === item)
											?.fileType === 'dir' ? (
											<FolderOpenFilled
												style={{ fontSize: 30, color: '#1890ff' }}
											/>
										) : (
											<FileTextOutlined
												style={{ fontSize: 30, marginLeft: -3 }}
											/>
										)}
										{item}
									</ListWrapper>
								</List.Item>
							)}
						/>
					</div>
				</ProCard>
				<ProCard title="About" size="default">
					<div>
						<p>{repoDetailInfo?.description ?? EMPTY_STRING_PLACEHOLDER}</p>
					</div>

					<Card>
						<Timeline>
							<Timeline.Item>
								Pushed at{' '}
								{dateFormat(repoDetailInfo?.pushed_at) ??
									EMPTY_STRING_PLACEHOLDER}
							</Timeline.Item>
							<Timeline.Item>
								Updated at{' '}
								{dateFormat(repoDetailInfo?.updated_at) ??
									EMPTY_STRING_PLACEHOLDER}
							</Timeline.Item>
							<Timeline.Item>
								Created at{' '}
								{dateFormat(repoDetailInfo?.created_at) ??
									EMPTY_STRING_PLACEHOLDER}
							</Timeline.Item>
						</Timeline>
					</Card>
					<Card style={{ marginTop: 20 }} title="Contributors">
						{contributors.length ? (
							<Wrapper>
								{contributors.map((item, index) => (
									<div>
										<Avatar key={index} src={item.avatar_url} alt={item.name} />
									</div>
								))}
							</Wrapper>
						) : (
							<Avatar icon={<UserOutlined />} />
						)}
					</Card>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							type="primary"
							size="large"
							style={{ marginTop: 50 }}
							href={`https://github.com/${repoOwner}/${repoName}`}
							target="_blank"
						>
							More Info
						</Button>
					</div>
				</ProCard>
			</ProCard>
		</div>
	);
};

export default RepoDetail;
