import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
	Statistic,
	Divider,
	Dropdown,
	Space,
	Menu,
	Card,
	Comment,
	Tooltip,
	Avatar,
	Timeline,
} from 'antd';
import { ProCard } from '@ant-design/pro-components';
import styled from 'styled-components';
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

const RepoDetail = () => {
	const [repoDetailInfo, setRepoDetailInfo] = useState<any>();
	const [responsive, setResponsive] = useState(false);
	const { repoId, repoOwner, repoName } = useParams();

	const getRepoDetailInfo = async (repoOwner, repoName) => {
		const res = await axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
		console.log('RESR', {
			openIssues: res.data.open_issues_count,
			watchers: res.data.watchers_count,
			forks: res.data.forks_count,
			subscribers: res.data.subscribers_count,
			language: res.data.language,
			description: res.data.description,
			created_at: res.data.created_at,
			updated_at: res.data.updated_at,
			pushed_at: res.data.pushed_at,
		});

		if (res.status === 200) {
			setRepoDetailInfo({
				openIssues: res.data.open_issues_count,
				watchers: res.data.watchers_count,
				forks: res.data.forks_count,
				subscribers: res.data.subscribers_count,
				language: res.data.language,
				description: res.data.description,
				created_at: res.data.created_at,
				updated_at: res.data.updated_at,
				pushed_at: res.data.pushed_at,
			});
			console.log(repoDetailInfo);
		}
	};

	const branchMenu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.antgroup.com"
						>
							1st menu item
						</a>
					),
				},
				{
					key: '2',
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.aliyun.com"
						>
							2nd menu item (disabled)
						</a>
					),
					disabled: true,
				},
				{
					key: '3',
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.luohanacademy.com"
						>
							3rd menu item (disabled)
						</a>
					),
					disabled: true,
				},
				{
					key: '4',
					danger: true,
					label: 'a danger item',
				},
			]}
		/>
	);

	useEffect(() => {
		getRepoDetailInfo('evanphx', 'atc');
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
							value={'open_issues'}
							precision={1}
						/>
					</ProCard>
					<Divider type={responsive ? 'horizontal' : 'vertical'} />
					<ProCard>
						<Statistic title="Watchers" value={'watchers'} precision={1} />
					</ProCard>
					<Divider type={responsive ? 'horizontal' : 'vertical'} />
					<ProCard>
						<Statistic title="Forks" value={'forks'} />
					</ProCard>
					<Divider type={responsive ? 'horizontal' : 'vertical'} />
					<ProCard>
						<Statistic title="Subscribers" value={'subscribers_count'} />
					</ProCard>
				</ProCard.Group>
			</RcResizeObserver>

			<CodeInfo>
				<Dropdown overlay={branchMenu}>
					<Space>
						Branch
						<DownOutlined />
					</Space>
				</Dropdown>
				<div>5 Branches</div>
				<div>5 tages</div>
				<div>Language</div>
			</CodeInfo>

			<ProCard
				split={responsive ? 'horizontal' : 'vertical'}
				bordered
				headerBordered
			>
				<ProCard title="×ó²àÏêÇé" colSpan="50%">
					{/* <div style={{ height: 360 }}>×ó²àÄÚÈÝ</div> */}
					<div>
						<h2>About</h2>
						<p>Description</p>
					</div>
				</ProCard>
				<ProCard title="About" size="default">
					{/* <div style={{ height: 360 }}>ÓÒ²àÄÚÈÝ</div> */}
					<div>
						<p>Description</p>
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
							<Timeline.Item>Pushed at pushed_at</Timeline.Item>
							<Timeline.Item>Updated at updated_at</Timeline.Item>
							<Timeline.Item>Created at created_at</Timeline.Item>
						</Timeline>
					</Card>
				</ProCard>
			</ProCard>
		</div>
	);
};

export default RepoDetail;
