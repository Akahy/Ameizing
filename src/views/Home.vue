<template>
  <div>
    <div class="navbar is-light">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../assets/snowball.png" alt="Ameizing">
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <b-field class="navbar-item">
            <b-select v-model="currentBattletag" placeholder="Battletag">
              <option
                v-for="battletag in profile.battletags"
                :value="battletag"
                :key="battletag.id"
              >{{ battletag.tag }}</option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>
    <div>{{ currentBattletag }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ProfileState } from '../store/modules/profile/types';

@Component
export default class Home extends Vue {
  @State profile!: ProfileState;

  @Action('fetchProfile') fetchProfile: any;

  currentBattletag: string = '';

  async created() {
    if (!this.profile.id) {
      await this.fetchProfile();
    }

    this.currentBattletag = this.profile.battletags[0];
  }
}
</script>
