import { get, debounce } from 'lodash';
import cms from '../../services/cms';

const rootUrl = 'http://159.89.132.165';

function transformPost(post) {
  const cover = get(post, 'cover', null);
  const tags = get(post, 'tags', '');
  return {
    ...post,
    // eslint-disable-next-line no-underscore-dangle
    id: post._id,
    cover: cover
      ? null
      : {
        ...cover,
        url: `${rootUrl}/${cover.path}`,
      },
    tags: tags.split(','),
  };
}

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {
    entries(state) {
      return (state.posts || []).map(p => transformPost(p));
    },
  },
  actions: {
    getEntry({ state, getters, commit }, id) {
      const existing = getters.entries.find(x => x.id.toString() === id.toString());
      if (existing) {
        return existing;
      }

      return cms.get('posts', { id }).then(({ entries: posts }) => {
        commit('setPosts', [...state.posts, ...posts]);
      });
    },
    getEntries: debounce(
      ({ commit }) => cms.get('posts', { published: true }).then(({ entries: posts }) => {
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
