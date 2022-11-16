import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
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

import RcResizeObserver from 'rc-resize-observer';
import { dateFormat } from '../../../utilities/index';

const Wrapper = styled.div`
	display: flex;

	justify-content: space-between;
`;

const RepoDetail: React.FC = () => {
	const [repoDetailInfo, setRepoDetailInfo] = useState<any>([]);

	const [contributors, setContributors] = useState([]);

	const [codeInfo, setCodeInfo] = useState<any>([]);
	const [responsive, setResponsive] = useState(false);
	const { repoOwner, repoName } = useParams();

	const getRepoDetailInfo = async (repoOwner?: string, repoName?: string) => {
		const res = await axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});

		if (res.status === 200) {
			setRepoDetailInfo(res.data);
		}
	};

	const getContributors = async (repoOwner?: string, repoName?: string) => {
		const res = await axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});

		if (res.status === 200) {
			setContributors(
				res.data
					.map((item) => ({
						name: item.login,
						avatar_url: item.avatar_url,
						contributions: item.contributions,
					}))
					.slice(0, 15)
			);
		}
	};

	const getCodeInfo = async (repoOwner?: string, repoName?: string) => {
		const res = await axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}/contents`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});

		if (res.status === 200) {
			setCodeInfo(
				[...res.data.map((item) => item.name)]
					.sort(() => 0.5 - Math.random())
					.slice(0, 10)
			);
		}
	};

	useEffect(() => {
		getRepoDetailInfo(repoOwner, repoName);
		getContributors(repoOwner, repoName);

		getCodeInfo(repoOwner, repoName);

		
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
									<Avatar
										src={repoDetailInfo?.owner?.avatar_url}
										alt="Han Solo"
									/>
									<div>
										Pushed at{' '}
										{moment(repoDetailInfo?.pushed_at).format('MMMM Do YYYY')}
									</div>
								</div>
							}
							bordered
							dataSource={codeInfo}
							renderItem={(item: any) => <List.Item>{item}</List.Item>}
						/>
					</div>
				</ProCard>
				<ProCard title="About" size="default">
					<div>
						<p>{repoDetailInfo?.description}</p>
					</div>

					<Card>
						<Timeline>
							<Timeline.Item>
								Pushed at {dateFormat(repoDetailInfo?.pushed_at)}
							</Timeline.Item>
							<Timeline.Item>
								Updated at {dateFormat(repoDetailInfo?.updated_at)}
							</Timeline.Item>
							<Timeline.Item>
								Created at {dateFormat(repoDetailInfo?.created_at)}
							</Timeline.Item>
						</Timeline>
					</Card>
					<Card style={{ marginTop: 20 }} title="Contributors">
						<Wrapper>
							{contributors.map((item: any) => (
								<div>
									<Avatar src={item.avatar_url} />
								</div>
							))}
						</Wrapper>
					</Card>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							type="primary"
							size="large"
							style={{ marginTop: 100 }}
							href={`https://github.com/${repoOwner}`}
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
