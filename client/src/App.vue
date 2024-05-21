<template>
  <!--   <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <PeopleCountInput/>
  <VacationTypeInput/>
  <AccommodationTypeInput/>
  <PriceRangeInput/>
</template>
<script>
//import HelloWorld from './components/HelloWorld.vue'
import PeopleCountInput from "./components/PeopleCountInput.vue"
import VacationTypeInput from './components/VacationTypeInput.vue'
import AccommodationTypeInput from "@/components/AccommodationTypeInput.vue";
import PriceRangeInput from "@/components/PriceRangeInput.vue";
export default {
  name: "App",
  components: {
    //HelloWorld,
    PeopleCountInput,
    VacationTypeInput,
    AccommodationTypeInput,
    PriceRangeInput
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
