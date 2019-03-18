import axios from 'axios';

function transformPost(post) {
  return {
    ...post,
    body: post.body
      .match(/!\[.*\]\(.*\)/g)
      .reduce(
        (acc, image) => acc.split(image).join(image.replace('](', '](http://cms.shannonarcher.me')),
        post.body,
      ),
  };
}

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  actions: {
    getPost({ state, commit }, id) {
      const existing = state.posts.find(x => x.id === id);
      if (existing) {
        return existing;
      }

      return axios.get(`http://cms.shannonarcher.me/posts/${id}`).then(({ data: post }) => {
        commit('setPosts', [...state.posts, transformPost(post)]);
        return transformPost(post);
      });
    },
    getPosts({ commit }) {
      return axios
        .get('http://cms.shannonarcher.me/posts?published=1&_sort=created_at:DESC')
        .then(({ data: posts }) => {
          commit('setPosts', posts.map(transformPost));
        });
    },
  },
  mutations: {
    setPosts(state, posts) {
      // eslint-disable-next-line no-param-reassign
      state.posts = posts;
    },
  },
};
