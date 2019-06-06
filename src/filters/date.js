import moment from 'moment';

export default (date, format = 'MM/YYYY') => {
    if (!date) {
      return 'present';
    }
    return moment(date).format(format);
};