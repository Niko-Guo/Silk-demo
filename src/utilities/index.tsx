import moment from 'moment';

export const dateFormat = (data: string) => {
	return moment(data).format('MMMM Do YYYY');
};
