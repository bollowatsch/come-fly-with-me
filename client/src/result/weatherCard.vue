<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item :title="'Current weather in ' + city">
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="7">
          {{ weatherData.temperature }}&deg;C
        </v-col>
        <v-col class="text-right" cols="5">
          <v-icon icon="mdi-white-balance-sunny" size="70"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle>{{ weatherData.windSpeed }} km/h</v-list-item-subtitle>
      </v-list-item>
      <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
        <v-list-item-subtitle>{{ weatherData.humidity }}%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <div class="py-2">
          <v-slider v-model="time" :max="6" :step="1" :ticks="labels" class="mx-4" color="primary" density="compact" show-ticks="always" thumb-size="10" hide-details></v-slider>
        </div>

        <v-list class="bg-transparent">
          <v-list-item v-for="item in weatherData.forecast" :key="item.day" :append-icon="item.icon" :subtitle="item.temp + ' &deg;C'" :title="item.day"></v-list-item>
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
import axios from "axios";

export default {
  props: {
    city: String,
  },
  data() {
    return {
      expand: false,
      time: 0,
      labels: [0, 1, 2, 3, 4, 5, 6],
      weatherData: {}
    };
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      try {
        const weather = await axios.get(`http://localhost:5000/api/weather/${this.city}`);
        if (weather.status === 200) {
          this.weatherData = {
            city: weather.data.location.name,
            temperature: weather.data.current.temp_c,
            windSpeed: weather.data.current.wind_kph,
            humidity: weather.data.current.humidity,
            forecast: weather.data.forecast.forecastday.map(day => ({
              day: day.date,
              temp: day.day.avgtemp_c,
              icon: day.day.condition.icon
            }))
          };
          console.log('Weather Data:', this.weatherData);
        } else {
          alert(`Error: ${weather.status}`);
        }
      } catch (error) {
        console.error('Error retrieving weather data:', error.message);
      }
    }
  }
};
</script>


<style scoped>
.bg-transparent {
  text-align: left;
}

</style>