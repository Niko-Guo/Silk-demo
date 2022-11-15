import React, { useState, useEffect } from 'react';
import { Card, Spin, Pagination } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

// {
// 	"message": "Request failed with status code 404",
// 	"name": "AxiosError",
// 	"stack": "AxiosError: Request failed with status code 404\n    at settle (http://localhost:3000/static/js/bundle.js:150519:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:149259:66)",
// 	"config": {
// 			"transitional": {
// 					"silentJSONParsing": true,
// 					"forcedJSONParsing": true,
// 					"clarifyTimeoutError": false
// 			},
// 			"transformRequest": [
// 					null
// 			],
// 			"transformResponse": [
// 					null
// 			],
// 			"timeout": 0,
// 			"xsrfCookieName": "XSRF-TOKEN",
// 			"xsrfHeaderName": "X-XSRF-TOKEN",
// 			"maxContentLength": -1,
// 			"maxBodyLength": -1,
// 			"env": {},
// 			"headers": {
// 					"Accept": "application/json, text/plain, */*",
// 					"accept": "application/vnd.github+json"
// 			},
// 			"url": "https://api.github.com//users/mojombo/repos",
// 			"method": "get"
// 	},
// 	"code": "ERR_BAD_REQUEST",
// 	"status": 404
// }

interface RepoItemProps {
	userName: string;
}
const RepoItem: React.FC<RepoItemProps> = ({ userName }) => {
	const [repoInfo, setRepoInfo] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);

	const [total, setTotal] = useState(1);

	const navigate = useNavigate();

	const getReposByUsername = async (
		userName: string
		// page: number = 1,
		// per_page: number = 18
	) => {
		setIsLoading(true);

		const res = await axios.request({
			url: `https://api.github.com/users/${userName}/repos`,
			method: 'GET',
			params: {
				// page,
				// per_page,
			},
			headers: {
				accept: 'application/vnd.github+json',
			},
		});

		if (res.status === 200) {
			setRepoInfo(
				res.data.map((item) => ({
					RepoId: item.id,
					RepoOwner: item.owner.login,
					RepoName: item.name,
					RepoDescription: item.description,
				}))
			);
			setTotal(res.data.length);
			setIsLoading(false);
			console.log('dddd', repoInfo);
		}
	};

	useEffect(() => {
		getReposByUsername(userName);
	}, [userName]);

	return (
		<Spin spinning={isLoading} size="large">
			<Wrapper>
				<Container>
					{repoInfo.map((item: any) => (
						<Card
							hoverable
							style={{ width: 300, height: 150, margin: 'auto' }}
							onClick={() => {
								navigate(`/repos/${item.RepoOwner}/${item.RepoName}/${item.RepoId}`);
							}}
						>
							<Card.Meta
								title={item?.RepoName ?? '--'}
								description={
									<p className="text">{item?.RepoDescription ?? '--'}</p>
								}
							/>
						</Card>
					))}
				</Container>
				<Pagination
					className="pagination"
					defaultCurrent={1}
					total={total}
					// onChange={(page) => getReposByUsername('Ky-Ling', page)}
					showSizeChanger={false}
				/>
			</Wrapper>
		</Spin>
	);
};

export default RepoItem;
