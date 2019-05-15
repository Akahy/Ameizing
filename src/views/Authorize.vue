<template>
  <div class="home">
    {{ code }}
    <br>
    {{ state }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import login from '@/api/login';

@Component
export default class Home extends Vue {
  @Action('retrieveToken') retrieveToken: any;

  @Prop({ required: true })
  code!: string;

  @Prop({ required: true })
  state!: string;

  created() {
    this.retrieveToken(this.code)
      .then(() => {
        this.$router.push('home');
      })
      .catch(() => {
        this.$router.push('landing');
      });
  }
}
</script>

<style lang="sass" scoped>
.home
  height: 100vh;
  background-color: pink;
</style>

