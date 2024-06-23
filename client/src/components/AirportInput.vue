<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-select
              v-model="airportSelection"
              :items="airports"
              color="primary"
              label="Airport"
              hint="*Currently we only offer flights from Vienna. We will expand our selection soon."
              persistent-hint
          ></v-select>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      airports: ['Vienna','Berlin','Munich'],
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

<style scoped>

.container{
  align-items: center;

}
.text {
  text-align: left;
  padding: 0 0 10px 0;
}
.text h2 {
  margin-top: 1em;
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1rem;
  }

  p,
  li {
    font-size: 0.9rem;
  }
}

</style>