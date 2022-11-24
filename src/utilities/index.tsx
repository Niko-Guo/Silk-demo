import moment from 'moment';

export const dateFormat = (data: string) => {
	return moment(data).format('MMMM Do YYYY');
};

export const sortArray = (array) => {
	return array.sort((a, b) =>
		a.fileType < b.fileType ? -1 : a.fileType > b.fileType ? 1 : 0
	);
};
