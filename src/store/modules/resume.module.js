import cms from '@/services/cms';

export default {
  namespaced: true,
  state: {
    header: {},
    experience: [],
    education: [],
  },
  getters: {
    resume({ header, experience, education }) {
      return {
        name: header.name,
        title: header.title,
        contacts: {
          email: header.email,
          github: header.github,
          website: header.website,
          phone: header.phone,
        },
        experience,
        education,
      };
    },
  },
  actions: {
    async getResume({ commit }) {
      const [
        header,
        { entries: experience },
        { entries: education },
      ] = await Promise.all([
        cms.singleton.get('resume'),
        cms.collection.get('experience', { published: true }),
        cms.collection.get('education', { published: true }),
      ]);

      commit('setHeader', header);
      commit('setExperience', experience);
      commit('setEducation', education);
    },
  },
  mutations: {
    setHeader(state, header) {
      state.header = header;
    },
    setExperience(state, experience) {
      state.experience = experience;
    },
    setEducation(state, education) {
      state.education = education;
    },
  },
};
