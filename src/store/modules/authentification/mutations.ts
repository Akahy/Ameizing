import { MutationTree } from 'vuex';
import { AuthentificationState } from './types';

let isInit: boolean = false;

export const mutations: MutationTree<AuthentificationState> = {
    initToken(state) {
        if (isInit) {
            return false;
        }
        const storage = localStorage.getItem('token');
        if (storage) {
            const items = JSON.parse(storage);
            if (items.expire_at > Math.floor(Date.now() / 1000)) {
                state.token = items.token;
                state.expireAt = items.expire_at;
                state.issuedAt = items.issued_at;
            }
        }
        isInit = true;
    },

    setToken(state, { token, expire_at, issued_at }) {
        localStorage.setItem('token', JSON.stringify({ token, expire_at, issued_at }));
        state.token = token;
        state.expireAt = expire_at;
        state.issuedAt = issued_at;
    },

    deleteToken(state) {
        localStorage.removeItem('token');
        state.token = null;
        state.expireAt = null;
        state.issuedAt = null;
    },
};
