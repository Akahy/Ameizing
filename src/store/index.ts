import Vue from 'vue';
import Vuex from 'vuex';

import { authentification } from './modules/authentification';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store<any>({
    modules: {
        authentification,
    },
    strict: debug,
});
