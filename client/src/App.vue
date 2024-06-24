<template>
  <v-app>
    <v-app-bar
        app
        class="app-bar">
      <div class="header-content">
        <v-app-bar-title class="hidden-sm-and-down" style="font-size: 0.85rem;">Come fly</v-app-bar-title>
        <img src="test.png" alt="Logo" class="logo" @click="goToStart">
        <v-app-bar-title class="hidden-sm-and-down" style="font-size: 0.85rem;">with me!</v-app-bar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" class="theme-btn">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="container">
      <v-row>
        <v-col cols="12" v-if="currentStep !== 0"></v-col>
      </v-row>

      <v-row>
        <v-col cols="12" v-if="currentStep !== 0">
          <progress :value="currentStep" :max="steps.length - 1" class="progress-bar"></progress>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <component :is="currentComponent" ref="currentComponent" v-if="currentComponent !== 'BookingConfirmation'"/>
          <BookingConfirmation v-else :bookingDetails="bookingDetails" />
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="currentStep === 0" class="d-flex justify-center">
          <v-btn v-if="currentStep === 0" @click="nextStep">Start booking you trip</v-btn>
        </v-col>
        <v-col v-else cols="12" class="d-flex justify-space-between">
          <v-btn @click="previousStep" v-show="currentStep !== 0 && currentStep !== steps.length-1">Back</v-btn>
          <v-btn v-if="currentStep === steps.length - 2" color="red" @click="deleteBooking">Delete</v-btn>
          <v-btn v-if="currentStep > 0 && currentStep < steps.length - 3" @click="nextStep"
                 :disabled="currentStep === steps.length - 1">
            Next
          </v-btn>
          <v-btn v-if="currentStep === steps.length - 3" @click="submitForm">Submit</v-btn>
          <v-btn v-if="currentStep === steps.length - 2" @click="submitPersonalDetails">Book bindingly</v-btn>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="headline">Validation Error</v-card-title>
          <v-card-text>
            Please make a selection to proceed!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="continueBookingDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Continue Booking</v-card-title>
          <v-card-text>
            Do you want to continue with your saved options or start a new booking?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="handleContinueResponse('useSavedOptions')">Continue</v-btn>
            <v-btn color="secondary" @click="handleContinueResponse('clearOptions')">Start New</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
import PeopleCountInput from "./components/PeopleCountInput.vue";
import VacationTypeInput from "./components/VacationTypeInput.vue";
import AccommodationTypeInput from "./components/AccommodationTypeInput.vue";
import MaxPriceInput from "./components/MaxPriceInput.vue";
import DateInput from "@/components/DateInput.vue";
import LandingPage from "@/components/LandingPage.vue";
import PersonalDetailsInput from "@/components/PersonalDetailsInput.vue";
import AirportInput from "@/components/AirportInput.vue";
import BookingConfirmation from "@/components/BookingConfirmation.vue";


import {storeOptionsInJWT, getOptionsFromJWT, clearOptionsinJWT} from './clientJwt';

const axios = require('axios')

export default {
  name: "App",
  components: {
    LandingPage,
    PeopleCountInput,
    VacationTypeInput,
    AccommodationTypeInput,
    AirportInput,
    MaxPriceInput,
    DateInput,
    PersonalDetailsInput,
    BookingConfirmation
  },
  data() {
    return {
      currentStep: 0,
      dialog: false,
      successDialog: false,
      continueBookingDialog: false,
      popupResponse: null,
      steps: [
        "LandingPage",
        "PeopleCountInput",
        "VacationTypeInput",
        "AccommodationTypeInput",
        "AirportInput",
        "MaxPriceInput",
        "DateInput",
        "PersonalDetailsInput",
        "BookingConfirmation"
      ],
      formData: {
        peopleCount: null,
        vacationType: [],
        accommodationType: null,
        airport: null,
        maxPrice: null,
        beginDate: null,
        endDate: null,
        numberOfNights: null,
      },
      bookingID: '',
      bookingDetails: {},
    };
  },
  computed: {
    currentComponent() {
      return this.steps[this.currentStep];
    },
  },
  methods: {
    async handleContinueResponse(response) {
      this.popupResponse = response;
      this.continueBookingDialog = false;

      if (response === 'useSavedOptions') {
        const savedOptions = await getOptionsFromJWT();
        this.formData.peopleCount = savedOptions.peopleCount;
        this.formData.vacationType = savedOptions.vacationType;
        this.formData.accommodationType = savedOptions.accommodationType;
        this.formData.airport = savedOptions.airport;
        this.formData.maxPrice = savedOptions.maxPrice;
        this.formData.beginDate = savedOptions.beginDate;
        this.formData.endDate = savedOptions.endDate;
        this.formData.numberOfNights = savedOptions.numberOfNights;

        console.log(this.formData);
        const incompleteStepIndex = this.getIncompleteStep();
        if (incompleteStepIndex !== -1) {
          this.currentStep = incompleteStepIndex;
        }
      } else {
        clearOptionsinJWT();
      }
    },
    goToStart() {
      this.currentStep = 0;
    },

    async nextStep() {
      const component = this.$refs.currentComponent;

      if (!component.isValid()) {
        this.dialog = true;
        return;
      }
      if (this.currentStep < this.steps.length - 1) {
        this.updateFormData();
        this.currentStep++;
        await storeOptionsInJWT(this.formData);
      }
      console.log(this.formData);
    },
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    updateFormData() {
      const component = this.$refs.currentComponent;
      switch (this.currentComponent) {
        case "PeopleCountInput":
          this.formData.peopleCount = component.getPeopleCount();
          break;
        case "VacationTypeInput":
          this.formData.vacationType = component.getVacationType();
          break;
        case "AccommodationTypeInput":
          this.formData.accommodationType = component.getAccommodationType();
          break;
        case "AirportInput":
          this.formData.airport = component.getAirport();
          break;
        case "MaxPriceInput":
          this.formData.maxPrice = component.getMaxPrice();
          break;
        case "DateInput":
          this.formData.beginDate = component.getBeginDate();
          this.formData.endDate = component.getEndDate();
          this.formData.numberOfNights = component.getNumberOfNights();
          break;
      }
    },
    async submitForm() {
      const component = this.$refs.currentComponent;

      if (!component.isValid()) {
        this.dialog = true;
        return;
      }

      this.updateFormData();


      const options = {
        method: 'POST',
        url: 'http://localhost:5000/sendData',
        data: {
          peopleCount: this.formData.peopleCount,
          maxPrice: this.formData.maxPrice,
          vacationType: this.formData.vacationType,
          accommodationType: this.formData.accommodationType,
          beginDate: this.formData.beginDate,
          endDate: this.formData.endDate,
          numberOfNights: this.formData.numberOfNights,
          departureAirport: this.formData.airport
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await this.nextStep();

      try{
        const response = await axios.request(options);
        this.bookingID = response.data.id;
        await storeOptionsInJWT({ ...this.formData, bookingID: this.bookingID });
      }catch (error) {
        alert(error);
      }
    },
    getIncompleteStep() {
      if (this.formData.peopleCount === null) return 1;
      if (this.formData.vacationType === null) return 2;
      if (this.formData.accommodationType === null) return 3;
      if (this.formData.airport === null) return 4;
      if (this.formData.maxPrice === null) return 5;
      if (this.formData.beginDate === null || this.formData.endDate === null || this.formData.numberOfNights === null) return 6;

      const allFieldsFilled = Object.values(this.formData).every(value => value !== null);
      if (allFieldsFilled) {
        return 7;
      }

      return 0; //if no data has been selected yet
    },
    async submitPersonalDetails() {
      const component = this.$refs.currentComponent;
      const personalDetails = component.getPersonalDetails();
      await this.sendPersonalDetails({...personalDetails, id: this.bookingID});
    },

    //Patch personal Data
    async sendPersonalDetails(details) {
      try {
        const tokenData = await getOptionsFromJWT();
        const bookingID = tokenData.bookingID;

        const options = {
          method: 'PATCH',
          url: 'http://localhost:5000/updatePersonalDetails',
          data: {
            bookingID: bookingID,
            firstName: details.first,
            lastName: details.last,
            mailAddress: details.mailAddress
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.request(options);
        this.bookingDetails = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          mailAddress: response.data.mailAddress,
          peopleCount: this.formData.peopleCount,
          vacationType: this.formData.vacationType,
          accommodationType: this.formData.accommodationType,
          airport: this.formData.airport,
          maxPrice: this.formData.maxPrice,
          beginDate: this.formData.beginDate,
          endDate: this.formData.endDate,
          numberOfNights: this.formData.numberOfNights,
        };
        this.currentStep = this.steps.length - 1;
        this.successDialog = true;
      } catch (error) {
        alert(`Error updating personal details: ${error.message}`);
      }
    },
    async deleteBooking() {
      try{
        const tokenData = await getOptionsFromJWT();
        const bookingID = tokenData.bookingID;

        const options = {
          method: 'DELETE',
          url: 'http://localhost:5000/deleteBooking',
          params: {
            bookingID: bookingID
          }
        };

        const res = await axios.request(options);
        if (res.status === 200) {
          alert("Booking deleted successfully");
          clearOptionsinJWT();
          this.currentStep = 0;
        } else {
          alert("Failed to delete booking");
        }
      } catch (error){
        alert("Error occured during delteing the booking !" + error.message)
      }
    }
  },
  async mounted() {
    const savedOptions = await getOptionsFromJWT();
    if (savedOptions) {
      this.continueBookingDialog = true;
    }
  }
};
</script>

<style>
body {
  display: flex;
  justify-content: center;
  background-image: url("assets/background.jpg");
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
  margin-bottom: 2vh;
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
  font-size: 1rem;
}

.github-btn {
  margin-left: auto;
  padding: 0;
  width: 5vh;
  height: 5vh;
  font-size:1rem;
}

@media (max-width: 600px) {
  body {
    background-image: none;
  }

  .app-bar {
    min-height: 3vh;
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

  .container {
    min-width: 100vw;
  }

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: 5vh;
  }

  .logo {
    height: 6vh;
    margin-left: 14vw;
  }

  .theme-btn {
    margin-left: auto;
    width: 4vh;
    height: 4vh;
    font-size: 2vh;
  }

}

#app {
  display: flex;
  align-items: center;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0;
  padding: 5vh 0;
}

.progress-bar {
  width: 100%;
  height: 1vh;
  -webkit-appearance: none;
  appearance: none;
}

.progress-bar::-webkit-progress-value {
  background-color: rgba(var(--v-theme-primary));
  border-radius: 5px 0 0 5px;
}

.footer {
  max-height: 5vh;
}
</style>