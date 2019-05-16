import { ActionTree } from 'vuex';
import { ProfileState } from './types';

import profile from '@/api/profile';

export const actions: ActionTree<ProfileState, any> = {
    fetchProfile({ commit }) {
        return profile.getProfile()
            .then((response) => {
                commit('setProfile', response);
            });
    },
};
