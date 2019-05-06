import get from 'lodash/get';
import debounce from 'lodash/debounce';
import moment from 'moment';
import cms from '../../services/cms';

const rootUrl = 'http://159.89.132.165';

function transformPost(post) {
  const cover = get(post, 'cover', null);
  const tags = get(post, 'tags', null);
  return {
    ...post,
    // eslint-disable-next-line no-underscore-dangle
    id: post._id,
    cover: cover
      ? {
        ...cover,
        url: `${rootUrl}/${cover.path}`,
      }
      : null,
    tags: tags ? tags.split(',') : [],
    createdAt: moment(post._created * 1000).fromNow(),
  };
}

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {
    entries(state) {
      return (state.posts || []).map(p => transformPost(p)).sort((a, b) => b._created - a._created);
    },
  },
  actions: {
    getEntry({ state, getters, commit }, id) {
      const existing = getters.entries.find(x => x.id.toString() === id.toString() && x.body);
      if (existing) {
        return existing;
      }

      return cms.collection.get('posts', { id }).then(({ entries: posts }) => {
        commit('setPosts', [
          ...state.posts.filter(p => p._id.toString() !== id.toString()),
          ...posts,
        ]);
      });
    },
    getEntries: debounce(
      ({ commit }) => cms.collection
        .get('posts', {
          published: true,
          fields: ['title', 'excerpt', 'tags', '_created', 'coverBackground'],
        })
        .then(({ entries: posts }) => {
          commit('setPosts', posts);
        }),
      60000,
      { leading: true, trailing: false },
    ),
  },
  mutations: {
    setPosts(state, posts) {
      // eslint-disable-next-line no-param-reassign
      state.posts = posts;
    },
  },
};
