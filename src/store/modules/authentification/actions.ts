import { ActionTree } from 'vuex';
import { AuthentificationState } from './types';

import login from '@/api/login';

export const actions: ActionTree<AuthentificationState, any> = {
    retrieveToken({ commit }, code) {
        return login.retrieveToken(code)
            .then((response) => {
                commit('setToken', response);
            });
    },
};
