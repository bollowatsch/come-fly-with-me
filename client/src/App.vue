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
      <v-btn @click="toggleTheme" class="theme-btn" style="width: 30px; height: 30px">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="container">
      <v-row>
        <v-col cols="12" v-if="currentStep !== 0">
          <v-spacer class="space-ah"></v-spacer>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" v-if="currentStep !== 0">
          <progress :value="currentStep" :max="steps.length - 1" class="progress-bar"></progress>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <component :is="currentComponent" ref="currentComponent"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="currentStep === 0" class="d-flex justify-center">
          <v-btn v-if="currentStep === 0" @click="nextStep">Start booking you trip</v-btn>
        </v-col>
        <v-col v-else cols="12" class="d-flex justify-space-between">
          <v-btn @click="previousStep" v-show="currentStep !== 0">Back</v-btn>
          <v-btn v-if="currentStep > 0 && currentStep < steps.length - 2" @click="nextStep"
                 :disabled="currentStep === steps.length - 1">
            Next
          </v-btn>
          <v-btn v-if="currentStep === steps.length - 2" @click="submitForm">Submit</v-btn>
          <v-btn v-if="currentStep === steps.length - 1" @click="submitPersonalDetails">Book bindingly</v-btn>
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

import {storeOptionsInJWT, getOptionsFromJWT} from './clientJwt';

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
    PersonalDetailsInput
  },
  data() {
    return {
      currentStep: 0,
      dialog: false,
      steps: [
        "LandingPage",
        "PeopleCountInput",
        "VacationTypeInput",
        "AccommodationTypeInput",
        "AirportInput",
        "MaxPriceInput",
        "DateInput",
        "PersonalDetailsInput"
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
    };
  },
  computed: {
    currentComponent() {
      return this.steps[this.currentStep];
    },
  },
  methods: {
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
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await this.nextStep();

      //TODO show resultPage if success
      await axios.request(options)
          .then(response => alert(response.data))
          .catch(error => alert(error))

      alert(`Persons: ${this.formData.peopleCount}\n
        Budget: ${this.formData.maxPrice}\n
        Vacation Types: ${this.formData.vacationType.join(', ')}\n
        Accommodation Type: ${this.formData.accommodationType}\n
        Date: ${this.formData.beginDate} - ${this.formData.endDate}\n
        Number of Nights: ${this.formData.numberOfNights}\n`);
      console.log(this.formData);
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
      const bookingID = "";
      await this.sendPersonalDetails({...personalDetails, id: bookingID});
    },

    async sendPersonalDetails(details) {
      try {
        const options = {
          method: 'PATCH',
          url: 'http://localhost:5000/updatePersonalDetails',
          data: {
            bookingID: details.bookingID,
            firstName: details.first,
            lastName: details.last,
            email: details.email
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.request(options);
        alert(`Personal details updated:\nFirst Name: ${response.data.firstName}\nLast Name: ${response.data.lastName}\nEmail: ${response.data.email}`);
      } catch (error) {
        alert(`Error updating personal details: ${error.message}`);
      }
    }
  },

  async mounted() {
    const savedOptions = await getOptionsFromJWT();
    if (savedOptions) {
      this.formData.peopleCount = savedOptions.peopleCount;
      this.formData.vacationType = savedOptions.vacationType;
      this.formData.accommodationType = savedOptions.accommodationType;
      this.formData.airport = savedOptions.airport;
      this.formData.maxPrice = savedOptions.maxPrice;
      this.formData.beginDate = savedOptions.beginDate;
      this.formData.endDate = savedOptions.endDate;
      this.formData.numberOfNights = savedOptions.numberOfNights;

      console.log(this.formData);
      //go to the first step without a value
      const incompleteStepIndex = this.getIncompleteStep();
      if (incompleteStepIndex !== -1) {
        this.currentStep = incompleteStepIndex;
      }
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

.github-btn {
  margin-left: auto;
  padding: 0;
  width: 5vh;
  height: 5vh;
  font-size: 2vh;
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

  .space-ah {
    margin-top: 0vh;
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

.space-ah {
  margin-top: 8vh;
}

.footer {
  max-height: 5vh;
}
</style>