<script setup>
import {useTheme} from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>
<script>
export default {
  data: () => ({
    show: false,
  }),

  methods: {


  }
};

</script>

<template>
  <v-app>
    <v-app-bar
        result
        class="app-bar">
      <v-app-bar-title class="hidden-sm-and-down">Come fly</v-app-bar-title>
      <v-toolbar-title class="text-center">
        <img src="test.png" alt="Logo" class="logo">
      </v-toolbar-title>
      <v-app-bar-title class="hidden-sm-and-down">with me!</v-app-bar-title>
      <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
    </v-app-bar>
    <v-banner class="banner-pic">
      <img src="./assets/CityPics/rome.jpg" alt="Rome">
      <div class="banner-text">
        <h1>Your trip goes to CITY-NAME!</h1>
      </div>
    </v-banner>
    <v-main class="container">
      <v-row>
        <v-col sm="4" md="2" lg="3">
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
        </v-col>

        <v-col cols="12" sm="4" md="2" lg="3">
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
        </v-col>
      </v-row>

    </v-main>
    <v-footer
        app
        border
        class="footer">
      <v-card-text class="text-center" style="width: 45%">&copy; Come Fly With Me! - 2024</v-card-text>
      <v-divider vertical></v-divider>
      <v-card-text style="width: 45%">
        <v-btn
            href="https://www.github.com/bollowatsch/come-fly-with-me"
            target="_blank"
            icon="mdi-github"
        ></v-btn>
      </v-card-text>
    </v-footer>

  </v-app>

</template>

<style>
body {
  justify-content: center;
  background-size: cover;
  padding: 0 0 5vh 0;
}

.container {
  padding: 5vh 5vw;
}

.app-bar {
  min-height: 60px;
  max-height: 5vh;
}

.banner-pic {
  width: 100%;
  min-height: 40vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
}

.banner-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
}

.footer {
  min-height: 60px;
  max-height: 5vh;
  display: flex;
  justify-content: space-between;
}

#result {
  display: flex;
  align-items: center;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}


.logo {
  margin-top: 25px;
  height: 100px;
}

.space-ah {
  margin-top: 100px;
}

</style>