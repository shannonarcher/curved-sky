import get from 'lodash/get';
import debounce from 'lodash/debounce';
import moment from 'moment';
import cms from '@/services/cms';

function transformPost(post) {
  const tags = get(post, 'tags', null);
  return {
    ...post,
    id: post.title.replace(/[^0-9a-zA-Z\s]/g, '').replace(/\s/g, '-').toLowerCase(),
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
    async getEntry({ state, getters, commit, dispatch }, id) {
      const existing = getters.entries.find(x => x.id.toString() === id.toString());
      if (existing && existing.body) {
        return existing;
      }

      if (!existing) {
        await dispatch('refreshEntries');
      }

      const newExisting = getters.entries.find(x => x.id.toString() === id.toString());

      if (newExisting) {
        const actualId = newExisting._id;
        const { entries: posts } = await cms.collection.get('posts', { id: actualId });
        commit('setPosts', [
          ...state.posts.filter(p => p._id.toString() !== actualId.toString()),
          ...posts,
        ]);
      }
    },
    getEntries: debounce(
      ({ dispatch }) => dispatch('refreshEntries'),
      60000,
      { leading: true, trailing: false },
    ),
    async refreshEntries({ commit }) {
      const { entries: posts } = await cms.collection
        .get('posts', {
          published: true,
          fields: ['title', 'excerpt', 'tags', '_created'],
        });
      commit('setPosts', posts);
    },
  },
  mutations: {
    setPosts(state, posts) {
      // eslint-disable-next-line no-param-reassign
      state.posts = posts;
    },
  },
};
