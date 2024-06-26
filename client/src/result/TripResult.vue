<template>
  <v-app>
    <v-app-bar
        result
        class="app-bar">
      <div class="header-content">
        <img src="../../public/test.png" alt="Logo" class="logo">
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" class="theme-btn">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-banner class="banner-pic">
      <img v-if="bookingData" :src="bookingData.hotel.hotelPicture" :alt="destination">
      <img v-if="error" src="../assets/background.jpg" alt="Venice">
      <div class="banner-text">
        <h1 v-if="bookingData">Your trip goes to {{ destination }}!</h1>
        <h1 v-if="error">Your trip is not available yet!</h1>
      </div>
    </v-banner>
    <v-main>
      <v-row class="container">
        <div id="booking-details">
          <div v-if="loading">Loading...</div>
          <div v-else-if="error" class="text-center">
            <p class="error-text">{{ error }}</p>
            <v-col v-if="error === 'Data not available yet.'" cols="12" class="d-flex justify-center align-center">
              <v-btn @click="changeBooking" class="action-btn">Change Booking</v-btn>
              <v-btn color="red" @click="deleteBookingConfirmation" class="action-btn ml-2">Delete Booking</v-btn>
            </v-col>
          </div>
          <div v-else class="d-flex justify-center">
            <v-col>
              <component :is="BookingSummaryCard" :data="bookingData" :destination="destination"></component>
            </v-col>
            <v-col class="components">
              <component :is="WeatherCard" :city="bookingData.destination.destinationName" :destination="destination"></component>
              <div class="mt-4"></div>
              <component :is="AttractionsCard" :city="bookingData.destination.destinationName"></component>
            </v-col>
          </div>
        </div>
      </v-row>

      <v-dialog v-model="deleteConfirmationDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Confirm Deletion</v-card-title>
          <v-card-text>
            Are you sure you want to delete the booking?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="confirmDelete">Yes</v-btn>
            <v-btn color="secondary" @click="deleteConfirmationDialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
        {{ snackbar.message }}
        <v-btn color="white" @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>

    </v-main>
    <v-footer
        app
        border
        class="footer">
      <div class="footer-content">
        <v-card-text align="center">&copy; Come Fly With Me! - 2024</v-card-text>
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
import WeatherCard from "@/result/weatherCard.vue";
import AttractionsCard from "@/result/AttractionsCard.vue";

import axios from 'axios';
import {clearOptionsinJWT, storeOptionsInJWT} from "@/clientJwt";

export default {
  components:{
    BookingSummaryCard,
    WeatherCard,
    AttractionsCard
  },
    data() {
      return {
        snackbar: {
          show: false,
          message: '',
          color: '',
          timeout: 3000
        },
        bookingID: window.location.pathname.split('/')[2],
        bookingData: null,
        loading: true,
        error: null,
        destination: '',
        deleteConfirmationDialog: false
      }
  },
  mounted() {
    const id = this.bookingID;
    this.fetchBookingData(id);
  },
  methods: {
    deleteBookingConfirmation() {
      this.deleteConfirmationDialog = true;
    },
    changeBooking(){
      clearOptionsinJWT()
      storeOptionsInJWT({bookingID: this.bookingID})
      window.location.href = "http://localhost:8080/";

    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    async fetchBookingData(bookingId) {
      try {
        const response = await fetch(`http://localhost:5000/booking/${bookingId}`);
        if (response.ok) {
          this.bookingData = await response.json();
          console.log(this.bookingData.picture)
          this.destination = this.bookingData.destination.destinationName.charAt(0).toUpperCase() + this.bookingData.destination.destinationName.slice(1);
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
    async confirmDelete() {
      try{
        const bookingID = this.bookingID;

        const options = {
          method: 'DELETE',
          url: 'http://localhost:5000/deleteBooking',
          params: {
            bookingID: bookingID
          }
        };

        const res = await axios.request(options);
        if (res.status === 200) {
          this.showSnackbar("Booking deleted successfully", "success");
          this.deleteConfirmationDialog = false;
          window.location.href = "http://localhost:8080/";
        } else {
          this.showSnackbar("Failed to delete booking", "error");
        }
      } catch (error){
        this.showSnackbar("Error occurred during deleting the booking! " + error.message, "error");
      }
    },

  },
};
</script>

<style>

.error-text {
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}

.ml-2 {
  margin-left: 8px;
}

.ml-4 {
  margin-left: 16px;
}

.action-btn {
  margin: 0 4px;
}

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
  align-items: center;
  justify-content: center;
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


.footer {
  max-height: 5vh;
}

.components {
  padding-bottom: 1vh;
}

@media (max-width: 600px) {

  .d-flex.justify-center {
    flex-direction: column;
    align-items: center;
  }
  .action-btn {
    margin: 8px 0;
  }
  body {
    min-width: 100vw;
    background-image: none;
  }
  .app-bar {
    min-height: 3vh;
    max-height: 5vh;
    align-items: center;
    justify-content: center;
  }

  .header-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 10vh;
  }

  .logo {
    height: 6vh;
    margin-left: 14vw;
  }

  .theme-btn {
    width: 4vh;
    height: 4vh;
    font-size: 1.5vh;
  }

  .container {
    padding: 1vh 2vw 3vh 2vw;
  }

  .footer-content {
    max-height: 5vh;
  }

  .banner-pic {
    min-height: 30vh;
  }

  .banner-text {
    font-size: 0.8rem;
    padding: 0.5rem;
    max-width: 90%;
  }

  .banner-text h1 {
    font-size: 1.5rem;
    word-break: break-word;
  }

  .d-flex.justify-center {
    flex-direction: column;
    align-items: center;
  }

  .components {
    padding: 1vh;
    margin-top: 1vh;
  }


  .v-col img {
    width: 100%;
    height: auto;
  }
}

</style>