import { MutationTree } from 'vuex';
import { ProfileState } from './types';

export const mutations: MutationTree<ProfileState> = {
    setProfile(state, { id, mail, battle_tags, tags }) {
        state.id = id;
        state.mail = mail;
        state.battletags = battle_tags;
        state.tags = tags;
    },
};
