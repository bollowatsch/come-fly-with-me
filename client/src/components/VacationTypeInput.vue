<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>What type of vacation do you wish to do?</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="card in cards"
          :key="card.id"
          :cols="getColsCountFromBreakpoints()"
      >
        <v-card hover @click="toggleCard(card)" :class="{'highlighted': card.isSelected}">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>{{ card.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vacationTypes from "@/data/vacationTypes";
let cards = [];
Object.values(vacationTypes).forEach((type) => {
  cards.push({title: type.toUpperCase(), isSelected: false});
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
        return 3;
      } else {
        return 2;
      }
    },
    toggleCard(card) {
      if (card.isSelected) {
        card.isSelected = false;
        return;
      }
      this.cards.forEach((card) => {
        card.isSelected = false;
      })
      card.isSelected = true;
    },

    getVacationType() {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].isSelected) {
          return this.cards[i].title;
        }
      }
      return null;
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