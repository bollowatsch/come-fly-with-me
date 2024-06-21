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
          cols="6" sm="6" md="4" lg="2"
          class="d-flex align-center justify-center"
      >
        <v-card hover @click="toggleCard(card)" :class="{'highlighted': card.isSelected}" class="accommodation-card">
          <v-img :src="card.image" aspect-ratio="16/9" class="align-end"></v-img>
          <v-card-title style="font-size: 0.75rem;">{{ card.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import accommodationTypes from "@/data/accommodationTypes";
let cards = [];
Object.values(accommodationTypes).forEach((type) => {
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

.accommodation-card {
  width: 100%;
  max-width: 10vw;
  text-align: center;
}

.accommodation-card v-img {
  height: auto;
  object-fit: cover;
}

.accommodation-card v-card-title {
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  padding: 10px 0;
}

@media (max-width: 600px) {
  .accommodation-card {
    width: 100%;
    max-width: 50vw;
    text-align: center;
  }

  .accommodation-card v-img {
    height: auto;
    object-fit: cover;
  }

  .accommodation-card v-card-title {
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