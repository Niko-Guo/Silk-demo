import axios from 'axios';
import { SearchParams } from '../components/Repos/RepoItem/interface';

const apiService = {
	getAllUsers(): Promise<any> {
		return axios.request({
			url: `https://api.github.com/users`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
			params: {
				per_page: 100,
			},
		});
	},

	getUserDetailInfo(userName: string): Promise<any> {
		return axios.request({
			url: `https://api.github.com/users/${userName}`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},

	getReposByUsername(params: SearchParams): Promise<any> {
		return axios.request({
			url: `https://api.github.com/search/repositories?q=user:${params.userName}`,
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
			url: `https://api.github.com/repos/${repoOwner}/${repoName}`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},

	getContributors(repoOwner?: string, repoName?: string): Promise<any> {
		return axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},

	getCodeBaseInfo(repoOwner?: string, repoName?: string): Promise<any> {
		return axios.request({
			url: `https://api.github.com/repos/${repoOwner}/${repoName}/contents`,
			method: 'GET',
			headers: {
				accept: 'application/vnd.github+json',
			},
		});
	},
};

export default apiService;
