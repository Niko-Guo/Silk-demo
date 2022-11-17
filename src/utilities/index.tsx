import moment from 'moment';

export const dateFormat = (data: string) => {
	return moment(data).format('MMMM Do YYYY');
};


export const getRandomItemsFromArray = (array: any[], number: number) => {
	return array.sort(() => 0.5 - Math.random())
					.slice(0, number)
}