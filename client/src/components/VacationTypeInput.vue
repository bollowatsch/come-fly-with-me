<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>What type of vacation do you wish to do?</h1>
      </v-col>
    </v-row>
    <v-row justify="center" class="vacation-row">
      <v-col
          v-for="card in cards"
          :key="card.id"
          cols="6" sm="6" md="2" lg="2"
          class="d-flex align-center justify-center"
      >
        <v-card id=card hover @click="toggleCard(card)" :class="{'highlighted': card.isSelected}" class="vacation-card">
          <v-img :src="card.image" ></v-img>
          <v-card-title style="font-size: 0.75rem;">{{ card.title}}</v-card-title>
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

    isValid() {
      return this.cards.some(card => card.isSelected);
    }

  }
};

</script>
<style scoped>
.highlighted {
  background-color: rgba(var(--v-theme-primary));
  color: rgba(var(--v-theme-on-primary));
}

.vacation-card {
  width: 100%;
  max-width: 10vw;
  text-align: center;
}

.vacation-card v-img {
  height: auto;
  object-fit: cover;
}

.vacation-card v-card-title {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;

}

@media (max-width: 600px) {
  .vacation-card {
    width: 100%;
    max-width: 50vw;
    text-align: center;
  }

  .vacation-card v-img {
    height: auto;
    object-fit: cover;
  }

  .vacation-card v-card-title {
    font-size: 0.4rem;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }

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