<template>
  <div class="landing">
    <div class="notification">Connecting</div>
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
    const state = localStorage.getItem('state');
    if (this.state !== state) {
      this.$router.push({ name: 'landing', query: { status: 'error' } });
    } else {
      localStorage.removeItem('state');
    }

    this.retrieveToken(this.code)
      .then(() => {
        this.$router.push('home');
      })
      .catch(() => {
        this.$router.push({ name: 'landing', query: { status: 'error' } });
      });
  }
}
</script>

<style lang="sass" scoped>
.landing 
    background-image: url('../assets/mei.png')
</style>


