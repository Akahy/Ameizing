import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { AuthentificationState } from './types';

const state: AuthentificationState = {
    token: null,
    expireAt: null,
    issuedAt: null,
};

export const authentification: Module<AuthentificationState, any> = {
    state,
    getters,
    actions,
    mutations,
};
