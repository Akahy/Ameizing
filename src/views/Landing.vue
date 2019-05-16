<template>
  <div class="landing">
    <b-button class="btn is-rounded is-medium is-primary" @click="login">Login</b-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Landing extends Vue {
  redirect: string = `${process.env.VUE_APP_CALLBACK_SKIM}://${
    window.location.host
  }/#/authorize`;

  loginUrl: string = `${process.env.VUE_APP_BASE_URI}/authorize?client_id=${
    process.env.VUE_APP_CLIENT_ID
  }&response_type=test`;

  login(): void {
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('state', state);
    localStorage.setItem('redirectUri', this.redirect);
    const url = `${this.loginUrl}&state=${state}&redirect_uri=${encodeURIComponent(
      this.redirect,
    )}`;
    window.location.href = url;
  }
}
</script>

<style lang="sass" scoped>
.landing 
    background-image: url('../assets/mei.png')
</style>

