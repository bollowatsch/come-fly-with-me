<script>
import axios from "axios";

export default {
  props: {
    city: String,
  },
  data() {
    return {
      show: false,
      expand: false,
      attractions: [],
    }
  },
  mounted() {
    this.getAttractions();
  },
  methods: {
    async getAttractions() {
      console.log(this.city)
      try {
        const attractions = await axios.get(`http://localhost:5000/api/attractions/${this.city}`);
        if (attractions.status === 200) {
          this.attractions = attractions.data;
        }
      } catch (error) {
        console.error('Error retrieving attractions data:', error.message);
      }
    }
  }
};

</script>

<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
      </v-col>
    </v-row>
    <v-row justify="center" class="vacation-row">
      <v-col
          v-for="(attraction, index) in attractions" :key="index" cols="12" md="6" lg="4"
      >
        <v-card class="mx-auto" max-width="368">
          <v-img
              height="200px"
              :src="attraction.image || 'https://www.augsburger-allgemeine.de/img/gesellschaft/crop53423091/2873898314-cv16_9-w572-owebp/AdobeStock-231946491?t=.jpg'"
              cover
          ></v-img>

          <v-card-title>{{ attraction.name }}</v-card-title>

          <v-card-subtitle>Recommendation percentage</v-card-subtitle>

          <v-card-actions>
            <v-btn :text="!expand ? 'Show Details' : 'Hide Details'" @click="expand = !expand"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-if="expand">
              <div class="py-2">
                <p>{{ attraction.description || 'No description available' }}</p>
                <p>Opening Hours: {{ attraction.opening_hours || 'Unknown' }}</p>
                <p>Website: <a :href="attraction.website" target="_blank">{{ attraction.website }}</a></p>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>