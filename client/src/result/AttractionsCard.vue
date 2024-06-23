<script setup>

</script>

<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
    ></v-img>

    <v-card-title>Attraction 1 name</v-card-title>

    <v-card-subtitle>Recommendation percentage</v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" text="Explore"></v-btn>

      <v-spacer></v-spacer>

      <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          shortDescription. + Link to Booking.com (created via static Link part "https://www.booking.com/attractions/" + countrycode + slug.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-card class="mx-auto" max-width="344">
    <v-img
        height="200px"
        src="https://r-xx.bstatic.com/xdata/images/xphoto/300x320/119069943.jpg?k=015d3b02622a4c322f12141428e4fc04490fb884bd8208b7431ae138a31f6499&o="
        cover
    ></v-img>

    <v-card-title>Rome Walking Tour</v-card-title>

    <v-card-subtitle>90% recommended</v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" text="Explore"></v-btn>

      <v-spacer></v-spacer>

      <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          A small-group tour to see some of the city's famous landmarks.
          Book via <a href="https://www.booking.com/attractions/it/pr52nrhakoab-rome-walking-tour.de.html" target="_blank">booking.com</a>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>

</style>