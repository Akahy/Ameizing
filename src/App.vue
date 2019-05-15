<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

.landing
  background: rgb(219,249,255);
  background: linear-gradient(144deg, rgba(219,249,255,1) 9%, rgba(245,245,255,1) 57%, rgba(38,195,227,0.6474790599833684) 81%);
  background-size: cover;
  background-position: center;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
</style>
