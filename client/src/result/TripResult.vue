<template>
  <v-app>
    <v-app-bar
        result
        class="app-bar">
      <div class="header-content">
        <v-app-bar-title class="hidden-sm-and-down" style="font-size: 0.85rem;">Come fly</v-app-bar-title>
        <img src="../../public/test.png" alt="Logo" class="logo">
        <v-app-bar-title class="hidden-sm-and-down" style="font-size: 0.85rem;">with me!</v-app-bar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" class="theme-btn">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-row class="container">
        <div id="booking-details">
          <div v-if="loading">Loading...</div>
          <div v-else-if="error">
            <p>{{ error }}</p>
            <v-col v-if="error === 'Data not available yet.'" cols="12" class="d-flex justify-space-between">
              <v-btn @click="changeBooking" class="action-btn" >Change Booking</v-btn>
              <v-btn @click="deleteBooking" class="action-btn" >Delete Booking</v-btn>
            </v-col>
          </div>
          <div v-else>
            <component :is="BookingSummaryCard" :data="bookingData"></component>
          </div>
        </div>
      </v-row>

    </v-main>
    <v-footer
        app
        border
        class="footer">
      <div class="footer-content">
        <v-card-text>&copy; Come Fly With Me! - 2024</v-card-text>
        <v-btn
            href="https://www.github.com/bollowatsch/come-fly-with-me"
            target="_blank"
            icon="mdi-github"
            class="github-btn hidden-sm-and-down"
            max-width="2vw"
            max-height="2vw"
        ></v-btn>
      </div>
    </v-footer>
    </v-app>

</template>

<script setup>
import {useTheme} from 'vuetify'


const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
<script>
import BookingSummaryCard from "@/result/BookingSummaryCard.vue";

export default {
  components:{
    BookingSummaryCard
  },
    data() {
      return {
        bookingData: null,
        loading: true,
        error: null,
      }
  },
  mounted() {
    const id = window.location.pathname.split('/')[2];
    console.log(id)
    this.fetchBookingData(id);
  },
  methods: {
    async fetchBookingData(bookingId) {
      try {
        const response = await fetch(`http://localhost:5000/booking/${bookingId}`);
        if (response.ok) {
          this.bookingData = await response.json();
        } else if (response.status === 403) {
          this.error = 'Data not available yet.'
        }
          else {
          this.error = `No booking information was found for id: ${bookingId}`;
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
        this.error = 'An error occurred while fetching booking data.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>



<style>
body {
  display: flex;
  justify-content: center;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  min-height: 100vh;
  margin: 0;
  font-size: 1rem;
}

.container {
  flex-direction: column;
  flex-grow: 1;
  padding: 2vh 5vw 5vh 5vw;
}

.app-bar {
  max-height: 5vh;
  align-items: center;
  justify-content: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 5vh;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 10vh;
}

.logo {
  height: 6vh;
  margin-top: 1vh;
}

.theme-btn {
  margin-left: auto;
  padding: 0;
  width: 5vh;
  height: 5vh;
  font-size: 2vh;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 5vh;
}

.github-btn {
  margin-left: auto;
  padding: 0;
  width: 5vh;
  height: 5vh;
  font-size: 2vh;
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

#result {
  display: flex;
  align-items: center;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.footer {
  max-height: 5vh;
}

</style>