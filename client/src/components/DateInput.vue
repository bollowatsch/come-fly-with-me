<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title>Choose your timeframe!</v-card-title>
          <v-card-item>
            <v-date-input
                v-model="possibleDates"
                label="Select a date"
                prepend-icon=""
                prepend-inner-icon="$calendar"
                variant="outlined"
                multiple="range"
                @change="updateMaxNumberOfNights"
            ></v-date-input>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title>How many nights do you want to stay?</v-card-title>
          <v-card-item>
            <v-number-input
                v-model="numberOfNights"
                :reverse="false"
                controlVariant="stacked"
                label="Nights to stay"
                :hideInput="false"
                :inset="false"
                variant="outlined"
                :step="1"
                :min="1"
                :max=maxNumberOfNights
            ></v-number-input>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      possibleDates: null,
      maxNumberOfNights: null,
      numberOfNights: null,
    }
  },
  watch: {
    possibleDates: {
      handler() {
        this.updateMaxNumberOfNights();
      },
      deep: true,
    },
  },
  methods: {
    updateMaxNumberOfNights() {
      const timeDifference = this.getEndDate().getTime() - this.getBeginDate().getTime();
      this.maxNumberOfNights = Math.round(timeDifference / (1000 * 3600 * 24)) - 1;
    },
    getBeginDate() {
      return new Date(Math.min(...(this.possibleDates)))
    },
    getEndDate(){
      return new Date(Math.max(...(this.possibleDates)))
    },
    getNumberOfNights() {
      return this.numberOfNights
    }
  }
};

</script>
<style scoped>
</style>