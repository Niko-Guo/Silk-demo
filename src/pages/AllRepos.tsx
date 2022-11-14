import React from 'react';
import RepoList from '../components/Repos/index';

const AllRepos: React.FC = () => {
	// Call API and pass the info to the component
	return (
		<div>
			<RepoList />
		</div>
	);
};

export default AllRepos;
