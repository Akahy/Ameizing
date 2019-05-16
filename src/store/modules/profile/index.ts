import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProfileState } from './types';

const state: ProfileState = {
    id: '',
    mail: '',
    battletags: [],
    tags: [],
};

export const profile: Module<ProfileState, any> = {
    state,
    actions,
    mutations,
};
