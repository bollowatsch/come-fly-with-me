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
    <v-row>
      <v-col :cols="12">
        <v-btn @click="submitForm()">Submit</v-btn>
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
    //TODO don't use display breakpoints but parent container size?
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
    submitForm() {
      let selectedCard = this.cards.find((card) => card.isSelected);
      if (!selectedCard) {
        console.log("No card selected!");
      } else {
        console.log("Number of people: " + selectedCard.title);
      }
      //TODO save selected data and return either into datastructure or to endpoint
    },
  }
};

</script>
<style scoped>
/*TODO change to actual highlighting style*/
.highlighted {
  background-color: lightblue; /* Change to your desired highlight color */
}
</style>