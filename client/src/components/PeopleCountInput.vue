<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>How many people are going to travel?</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-slider
            v-model="peopleCount"
            :min="1"
            :max="6"
            :step="1"
            ticks="always"
            tick-size="3"
            class="custom-slider"
            color=primary
        ></v-slider>
        <div class="text-center">
          <span>{{ peopleCount }} Person{{ peopleCount > 1 ? 's' : '' }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      peopleCount: 1,
    };
  },
  methods: {
    getPeopleCount() {
      return this.peopleCount;
    },
    isValid() {
      return true;
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
