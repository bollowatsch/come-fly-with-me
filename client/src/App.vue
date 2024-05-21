<template>
  <!--   <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <PersonCount/>
  <VacationType/>
  <AccommodationType/>
  <PriceQuery/>
</template>
<script>
//import HelloWorld from './components/HelloWorld.vue'
import PersonCount from "./components/PersonCount.vue"
import VacationType from './components/VacationType.vue'
import AccommodationType from "@/components/AccommodationType.vue";
import PriceQuery from "@/components/PriceQuery.vue";
export default {
  name: "App",
  components: {
    //HelloWorld,
    PersonCount,
    VacationType,
    AccommodationType,
    PriceQuery
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
