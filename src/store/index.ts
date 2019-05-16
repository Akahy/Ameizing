import Vue from 'vue';
import Vuex from 'vuex';

import { authentification } from './modules/authentification';
import { profile } from './modules/profile';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store<any>({
    modules: {
        authentification,
        profile,
    },
    strict: debug,
});
