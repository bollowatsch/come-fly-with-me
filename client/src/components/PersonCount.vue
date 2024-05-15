<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>Wie viele Personen wollen verreisen?</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="card in cards"
          :key="card.id"
          :cols="getColsCount()"
      >
        <v-card hover @click="toggleCard(card)" :class="{'highlighted': card.isSelected}">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>{{ card.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-btn>Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { id: 1, title: '1'},
        { id: 2, title: '2'},
        { id: 3, title: '3'},
        { id: 4, title: '4'},
        { id: 5, title: '5'},
        { id: 6, title: '6'},
      ]
    };
  },
  methods: {
    getColsCount() {
      if (this.$vuetify.display.smAndDown) {
        return 6; // Display one card per row on small screens
      } else if (this.$vuetify.display.mdAndDown) {
        return 3; // Display two cards per row on medium screens
      } else {
        return 2; // Display three cards per row on large screens and above
      }
    },
    toggleCard(card){
      card.isSelected = !card.isSelected;
    },
    submitForm(){
      //TODO save selected data and return either into datastructure or to endpoint
    }
  }
};
</script>
<style scoped>
.highlighted {
  background-color: lightblue; /* Change to your desired highlight color */
}
</style>