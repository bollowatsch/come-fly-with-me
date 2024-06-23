<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item :title="city">
      <template v-slot:subtitle>
        <v-icon class="me-1 pb-1" color="error" icon="mdi-alert" size="18"></v-icon>
        {{ weatherAlert }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="6">
          {{ temperature }}&deg;C
        </v-col>
        <v-col class="text-right" cols="6">
          <v-icon color="error" icon="mdi-weather-hurricane" size="88"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle>{{ windSpeed }} km/h</v-list-item-subtitle>
      </v-list-item>
      <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
        <v-list-item-subtitle>{{ humidity }}%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <div class="py-2">
          <v-slider v-model="time" :max="6" :step="1" :ticks="labels" class="mx-4" color="primary" density="compact" show-ticks="always" thumb-size="10" hide-details></v-slider>
        </div>

        <v-list class="bg-transparent">
          <v-list-item v-for="item in forecast" :key="item.day" :append-icon="item.icon" :subtitle="item.temp" :title="item.day"></v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :text="!expand ? 'Full Report' : 'Hide Report'" @click="expand = !expand"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    city: String,
    weatherAlert: String,
    temperature: Number,
    windSpeed: Number,
    humidity: Number,
    forecast: Array
  },
  data() {
    return {
      expand: false,
      time: 0,
      labels: [0, 1, 2, 3, 4, 5, 6]
    };
  }
};
</script>


<style scoped>

</style>