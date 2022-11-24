import { useCallback, useState } from 'react';
import axios from 'axios';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async (requestConfig, applyData, mappingData) => {
			setIsLoading(true);
			setError(null);

			try {
				const res = await axios.request({
					url: requestConfig.url,
					method: 'GET',
					params: requestConfig.params ?? null,
					headers: {
						accept: 'application/vnd.github+json',
					},
				});

				
				if (res.status === 200) {
					if (mappingData) {
						applyData(res.data.map(mappingData));
					} else {
						applyData(res.data);
					}
				}
			} catch (err: any) {
				setError(err.message || 'Something went wrong!');
			}
			setIsLoading(false);
		},
		[]
	);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;
