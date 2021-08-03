import moment from 'moment';

const isToday = (momentDate) => momentDate.isSame(moment().startOf('day'), 'd');

export default isToday