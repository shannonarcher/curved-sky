import axios from 'axios';

const rootUrl = 'http://159.89.132.165';
const getCollectionUrl = `${rootUrl}/api/collections/get/`;
const getSingletonUrl = `${rootUrl}/api/singletons/get/`;

export default {
  collection: {
    async get(collection, { published, id, fields } = {}) {
      const endpoint = `${getCollectionUrl}${collection}`;

      if (id) {
        // get one
        const { data } = await axios.get(`${endpoint}?filter[_id]=${id}`);
        return data;
      }

      let filters = '';
      if (published) {
        filters += `?filter[published]=${published}`;
      }

      if (fields) {
        filters = `${`${filters}&` || '?'}${fields.map(f => `fields[${f}]=true`).join('&')}`;
      }

      // get all
      const { data } = await axios.get(`${endpoint}${filters}`);
      return data;
    },
  },
  singleton: {
    async get(singleton) {
      const endpoint = `${getSingletonUrl}${singleton}`;
      const {data} = await axios.get(`${endpoint}`);
      return data;
    },
  },
};
