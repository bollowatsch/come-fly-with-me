<script>
export default {
  data() {
    return {
      airports: ['Vienna'],
      airportSelection: 'Vienna',
    }
  },
  methods: {
    getAirport() {
      return this.airportSelection
    },
    isValid() {
      return this.airportSelection !== null;
    },
  }
}
</script>

<template>
  <div>
    <v-select
        v-model="airportSelection"
        :items="airports"
        color="primary"
        label="Airport"
        hint="*Currently we only offer flights from Vienna. We will expand our selection soon."
        persistent-hint
    ></v-select>
  </div>

</template>

<style scoped>

</style>