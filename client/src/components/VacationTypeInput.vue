<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>What type of vacation do you wish to do?</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
          v-for="card in cards"
          :key="card.id"
          cols="6" sm="6" md="4" lg="4"
      >
        <v-card id=card hover @click="toggleCard(card)" :class="{'highlighted': card.isSelected}">
          <v-img :src="card.image" aspect-ratio="1.5"></v-img>
          <v-card-title>{{ card.title}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vacationTypes from "@/data/vacationTypes";
let cards = [];
Object.values(vacationTypes).forEach((type) => {
  cards.push({title: type.title.toUpperCase(), image: type.image, isSelected: false});
})
export default {
  data() {
    return {
      cards
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
  /* Flip colors if selected */
  background-color: rgba(var(--v-theme-primary));
  color: rgba(var(--v-theme-on-primary));
}
</style>