import createPersistedState from 'vuex-persistedstate';

import blog from './modules/blog.module';
import projects from './modules/projects.module';
import resume from './modules/resume.module';
import singletons from './modules/singletons.module';

export default {
  modules: {
    blog,
    projects,
    resume,
    singletons,
  },
  plugins: [
    createPersistedState(),
  ],
};
