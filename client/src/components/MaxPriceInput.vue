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
            :min="50"
            :max="1000"
            :step="10"
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
      maxPrice: 50,
    };
  },
  methods: {
    getMaxPrice() {
      return this.maxPrice;
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-top: 10px;
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
