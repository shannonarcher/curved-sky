import axios from 'axios';

const rootUrl = 'http://159.89.132.165';
const getCollectionUrl = `${rootUrl}/api/collections/get/`;
const getSingletonUrl = `${rootUrl}/api/singletons/get/`;

export default {
  collection: {
    async get(collection, { published, id }) {
      const endpoint = `${getCollectionUrl}${collection}`;

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
  },
  singleton: {
    async get(singleton) {
      const endpoint = `${getSingletonUrl}${singleton}`;
      return axios.get(`${endpoint}`).then(({ data }) => data);
    },
  },
};
