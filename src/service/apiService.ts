import axios from 'axios';

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

	getReposByUsername(params): Promise<any> {
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
};

export default apiService;
