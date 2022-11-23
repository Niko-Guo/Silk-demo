import axios from 'axios';
import { BASE_REQUEST_URL } from '../constants/index';
import { SearchParams } from '../components/Repos/RepoItem/interface';

const apiService = {
	getUserDetailInfo(userName: string): Promise<any> {
		return axios.request({
			url: `${BASE_REQUEST_URL}/users/${userName}`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},

	getReposByUsername(params: SearchParams): Promise<any> {
		return axios.request({
			url: `${BASE_REQUEST_URL}/search/repositories?q=user:${params.userName}`,
			method: 'GET',
			params: {
				page: params.page,
				per_page: params.per_page,
			},
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},

	getRepoDetailInfo(repoOwner?: string, repoName?: string): Promise<any> {
		return axios.request({
			url: `${BASE_REQUEST_URL}/repos/${repoOwner}/${repoName}`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},

	getContributors(repoOwner?: string, repoName?: string): Promise<any> {
		return axios.request({
			url: `${BASE_REQUEST_URL}/repos/${repoOwner}/${repoName}/contributors`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},

	getCodeBaseInfo(repoOwner?: string, repoName?: string): Promise<any> {
		return axios.request({
			url: `${BASE_REQUEST_URL}/repos/${repoOwner}/${repoName}/contents`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},
};

export default apiService;
