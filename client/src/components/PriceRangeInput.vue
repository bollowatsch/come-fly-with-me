<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>How much do you wish to spend?</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-range-slider
            v-model="priceRange"
            :max="400"
            :min="20"
            :step="5"
            class="align-center"
            hide-details
        >
          <template v-slot:prepend>
            <v-text-field
                v-model="priceRange[0]"
                density="compact"
                style="width: 70px"
                type="number"
                variant="outlined"
                hide-details
                single-line
            />
          </template>
          <template v-slot:append>
            <v-text-field
                v-model="priceRange[1]"
                density="compact"
                style="width: 70px"
                type="number"
                variant="outlined"
                hide-details
                single-line
            />
          </template>
        </v-range-slider>
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
export default {
  data() {
    return {
      priceRange: [60, 100]
    }
  }, methods: {
    submitForm() {
      console.log("Price Range: " + this.priceRange[0] + " - " + this.priceRange[1]);
    }
  }
}
</script>

<style scoped>

</style>