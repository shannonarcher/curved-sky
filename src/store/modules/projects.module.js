import debounce from 'lodash/debounce';
import cms from '@/services/cms';

export default {
  namespaced: true,
  state: {
    projects: [],
  },
  getters: {
    entries(state) {
      return state.projects.map(project => ({
        ...project,
        // eslint-disable-next-line no-underscore-dangle
        id: project._id,
      }));
    },
  },
  actions: {
    getEntries: debounce(
      ({ commit }) => cms.collection.get('projects', { published: true }).then(({ entries: projects }) => {
        commit('setProjects', projects);
      }),
      60000,
      { leading: true, trailing: false },
    ),
  },
  mutations: {
    setProjects(state, projects) {
      // eslint-disable-next-line no-param-reassign
      state.projects = projects;
    },
  },
};
