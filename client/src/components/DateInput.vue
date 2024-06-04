<template>
  <v-container>
    <v-row justify="space-around">
      <p>Pick your available timeframe: </p>
      <v-date-picker
          color="primary"
          range
      ></v-date-picker>
    </v-row>
    <v-row>
      <p>How many nights do you wish to stay?</p>
      <v-text-field
          hint="Enter how many nights you wish to stay"
          type="number"
          step="1"
          min="1"
          max="21"
      ></v-text-field>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  methods: {
    getColsCountFromBreakpoints() {
      if (this.$vuetify.display.smAndDown) {
        return 6;
      } else if (this.$vuetify.display.mdAndDown) {
        return 4;
      } else {
        return 3;
      }
    },
    toggleCard(card) {
      card.isSelected = !card.isSelected;
    },

    getVacationType() {
      const selectedTypes = [];
      for (let card of this.cards) {
        if (card.isSelected) {
          selectedTypes.push(card.title);
        }
      }
      return selectedTypes;
    },
  }
};

</script>
<style scoped>
/*TODO change to actual highlighting style*/
.highlighted {
  background-color: #89cff0; /* Change to your desired highlight color */
}
</style>