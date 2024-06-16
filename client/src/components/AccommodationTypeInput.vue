<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>What type of accommodation do you wish to have?</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
          v-for="card in cards"
          :key="card.id"
          cols="8" sm="6" md="6" lg="6"
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
import accommodationTypes from "@/data/accommodationTypes";
let cards = [];
Object.values(accommodationTypes).forEach((type) => {
  cards.push({title: type.toUpperCase(), isSelected: false});
})
export default {
  data() {
    return {
      cards
    };
  },
  methods: {
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
    getAccommodationType() {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].isSelected) {
          return this.cards[i].title;
        }
      }
      return null;
    },
    isValid() {
      return this.cards.some(card => card.isSelected);
    }
  }
};

</script>
<style scoped>
.highlighted {
  /* Flip colors if selected */
  background-color: rgba(var(--v-theme-primary));
  color: rgba(var(--v-theme-on-primary));
}

@media (max-width: 400px) {
  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  p,
  li {
    font-size: 0.9rem;
  }
}
</style>