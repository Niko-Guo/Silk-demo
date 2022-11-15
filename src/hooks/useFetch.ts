import axios from 'axios';

export const useFetch = async (
	repoOwner?: string,
	repoName?: string,
	suffix?: string
) => {
	const res = await axios.request({
		url: `https://api.github.com/repos/${repoOwner}/${repoName}${suffix}`,
		method: 'GET',
		headers: {
			accept: 'application/vnd.github+json',
		},
	});

	if (res.status === 200) {
		return {
			data: res.data,
		};
	} else {
		return {
			data: res?.message,
		};
	}
};
