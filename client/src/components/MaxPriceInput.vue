<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>How much do you want to spend per person per night ? [€]</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-slider
            v-model="maxPrice"
            :min="100"
            :max="500"
            :step="25"
            ticks="always"
            tick-size="3"
            class="custom-slider"
            color= primary
        ></v-slider>
        <div class="text-center">
          <span>{{ maxPrice }} € per person per night</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      maxPrice: 100,
    };
  },
  methods: {
    getMaxPrice() {
      return this.maxPrice;
    },
    isValid() {
      return true; // Slider always has valid default-value
    }
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-top: 10px;
}

@media (max-width: 600px) {
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
