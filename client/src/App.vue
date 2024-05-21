<template>
  <!--   <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <PersonCount/>
  <VacationType/>
</template>
<script>
//import HelloWorld from './components/HelloWorld.vue'
import PersonCount from "./components/PersonCount.vue"
import VacationType from './components/VacationType.vue'
export default {
  name: 'App',
  components: {
    //HelloWorld,
    PersonCount,
    VacationType
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
