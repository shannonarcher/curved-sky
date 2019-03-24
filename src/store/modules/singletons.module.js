import { get, debounce } from 'lodash';
import cms from '../../services/cms';

const rootUrl = 'http://159.89.132.165';

export default {
  namespaced: true,
  state: {
    singletons: {},
  },
  getters: {
    profile(state) {
      const { profile } = state.singletons;
      if (profile) {
        return {
          ...profile,
          image: profile.image.path ? `${rootUrl}/${get(profile.image, 'path', '')}` : null,
        };
      }
      return {};
    },
  },
  actions: {
    getSingleton: debounce(
      ({ commit }, singleton) => cms.singleton.get(singleton).then((value) => {
        commit('setSingleton', {
          key: singleton,
          value,
        });
      }),
      600000,
      { leading: true, trailing: false },
    ),
  },
  mutations: {
    setSingleton(state, { key, value }) {
      // eslint-disable-next-line no-param-reassign
      state.singletons = {
        ...state.singletons,
        [key]: value,
      };
    },
  },
};
