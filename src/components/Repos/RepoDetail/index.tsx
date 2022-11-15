import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
	Statistic,
	Divider,
	Dropdown,
	Space,
	Card,
	Comment,
	Tooltip,
	Avatar,
	Timeline,
} from 'antd';
import { ProCard } from '@ant-design/pro-components';
import styled from 'styled-components';
import { useFetch } from '@hooks/useFetch';
import RcResizeObserver from 'rc-resize-observer';
import { DownOutlined } from '@ant-design/icons';

const CodeInfo = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	padding: 15px;
	background-color: white;
	height: 50px;
	font-size: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

interface repoDetailInfo {
	openIssues: number;
	watchers: number;
	forks: number;
	subscribers: number;
	language: string;
	description: string;
	created_at: string;
	updated_at: string;
	pushed_at: string;
}

const RepoDetail: React.FC = () => {
	const [repoDetailInfo, setRepoDetailInfo] = useState<any | never>({});
	const [branchInfo, setBranchInfo] = useState([]);
	const [totalBranches, setTotalBranches] = useState(0);
	const [totalTags, setTotalTags] = useState(0);
	const [responsive, setResponsive] = useState(false);
	const { repoId, repoOwner, repoName } = useParams();

	const { data: repoDetail} = useFetch(repoOwner, repoName, '' );
	const { data: branchDetail } = useFetch(repoOwner, repoName, '/branches' );
	const { data: tagsDetail} = useFetch(repoOwner, repoName, '/tags' );


	const getRepoDetailInfo = async (repoOwner, repoName) => {
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

	const getBranches = async (repoOwner, repoName) => {
		const res = await axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}/branches`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
		console.log('bbbb', res);

		if (res.status === 200) {
			setTotalBranches(res.data.length);
			setBranchInfo(
				res.data.map((item, index) => ({
					label: item.name,
					key: index,
				}))
			);
		}
	};

	const getTags = async (repoOwner, repoName) => {
		const res = await axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}/branches`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
		console.log('bbbb', res);

		if (res.status === 200) {
			setTotalTags(res.data.length);
		}
	};

	const items = [
		{ label: 'item 1', key: 'item-1' }, // remember to pass the key prop
		{ label: 'item 2', key: 'item-2' },
	];

	useEffect(() => {
		getRepoDetailInfo('evanphx', 'atc');
		getBranches('evanphx', 'atc');
		getTags('evanphx', 'atc');
	}, []);

	return (
		<div style={{ padding: 20, background: '#f0f2f5' }}>
			<RcResizeObserver
				key="resize-observer"
				onResize={(offset) => {
					setResponsive(offset.width < 596);
				}}
			>
				<ProCard.Group
					title={` owner / repoName`}
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

			<CodeInfo>
				<Dropdown menu={{ items }}>
					<Space>
						Branch
						<DownOutlined />
					</Space>
				</Dropdown>
				<div>{totalBranches} Branches</div>
				<div>{totalTags} tages</div>
				<div>{repoDetailInfo?.language}</div>
			</CodeInfo>

			<ProCard
				split={responsive ? 'horizontal' : 'vertical'}
				bordered
				headerBordered
			>
				<ProCard title="×ó²àÏêÇé" colSpan="50%">
					<div>
						<h2>About</h2>
						<p>Description</p>
					</div>
				</ProCard>
				<ProCard title="About" size="default">
					<div>
						<p>{repoDetailInfo?.description}</p>
					</div>
					<Card>
						<Comment
							// actions={actions}
							// author={<a>Han Solo</a>}
							avatar={
								<Avatar
									src="https://joeschmoe.io/api/v1/random"
									alt="Han Solo"
								/>
							}
							content={
								<p>
									We supply a series of design principles, practical patterns
									and high quality design resources (Sketch and Axure), to help
									people create their product prototypes beautifully and
									efficiently.
								</p>
							}
							datetime={
								<Tooltip title="2016-11-22 11:22:33">
									<span>8 hours ago</span>
								</Tooltip>
							}
						/>
					</Card>
					<Card>
						<Timeline>
							<Timeline.Item>
								Pushed at {repoDetailInfo?.pushed_at}
							</Timeline.Item>
							<Timeline.Item>
								Updated at {repoDetailInfo?.updated_at}
							</Timeline.Item>
							<Timeline.Item>
								Created at {repoDetailInfo?.created_at}
							</Timeline.Item>
						</Timeline>
					</Card>
				</ProCard>
			</ProCard>
		</div>
	);
};

export default RepoDetail;
