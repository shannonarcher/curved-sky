import axios from 'axios';

const rootUrl = 'http://159.89.132.165';
const get = `${rootUrl}/api/collections/get/`;

export default {
  async get(collection, { published, id }) {
    const endpoint = `${get}${collection}`;

    if (id) {
      // get one
      return axios.get(`${endpoint}?filter[_id]=${id}`).then(({ data }) => data);
    }

    let filters = '';
    if (published) {
      filters += `?filter[published]=${published}`;
    }

    // get all
    return axios.get(`${endpoint}${filters}`).then(({ data }) => data);
  },
};
