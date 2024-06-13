<template>
  <v-app>
    <v-app-bar
        app
        class="app-bar">
      <div class="header-content">
        <v-app-bar-title class="hidden-sm-and-down">Come fly </v-app-bar-title>
        <img src="test.png" alt="Logo" class="logo" @click="goToStart">
        <v-app-bar-title class="hidden-sm-and-down">with me!</v-app-bar-title>
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
          <v-btn v-if="currentStep > 0 && currentStep < steps.length - 1" @click="nextStep" :disabled="currentStep === steps.length - 1">
            Next
          </v-btn>
          <v-btn v-if="currentStep === steps.length - 1" @click="submitForm">Submit</v-btn>
        </v-col>
      </v-row>
    </v-main>
    <v-footer
        app
        border
        class="footer">
      <div class="footer-content">
        <v-card-text >&copy; Come Fly With Me! - 2024</v-card-text>
        <v-btn
            href="https://www.github.com/bollowatsch/come-fly-with-me"
            target="_blank"
            icon="mdi-github"
            class="github-btn hidden-sm-and-down"
        ></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>
<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
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

const axios = require('axios')

export default {
  name: "App",
  components: {
    LandingPage,
    PeopleCountInput,
    VacationTypeInput,
    AccommodationTypeInput,
    MaxPriceInput,
    DateInput
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        "LandingPage",
        "PeopleCountInput",
        "VacationTypeInput",
        "AccommodationTypeInput",
        "MaxPriceInput",
        "DateInput"
      ],
      formData: {
        peopleCount: null,
        vacationType: [],
        accommodationType: null,
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
      this.currentStep = 0; // Zur Startseite zurückkehren
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.updateFormData();
        this.currentStep++;
      }
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
      this.updateFormData();

      const options = {
        method: 'POST',
        url: 'http://localhost:3000/sendData',
        data: {
          peopleCount: this.formData.peopleCount,
          maxPrice: this.formData.maxPrice,
          vacationType: this.formData.vacationType,
          accommodationType: this.formData.accommodationType,
          beginDate: this.formData.beginDate,
          endDate: this.formData.endDate,
          numberOfNight: this.formData.numberOfNights,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };

      //TODO show resultPage if success
      await axios.request(options)
          .then(response => alert(response))
          .catch(error => alert(error))

      alert(`Persons: ${this.formData.peopleCount}\n
        Budget: ${this.formData.maxPrice}\n
        Vacation Types: ${this.formData.vacationType.join(', ')}\n
        Accommodation Type: ${this.formData.accommodationType}\n
        Date: ${this.formData.beginDate} - ${this.formData.endDate}\n
        Number of Nights: ${this.formData.numberOfNights}\n`);
      console.log(this.formData);
    }
  },
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
  margin: 0;
}

.app-bar {
  max-height: 10vh;
  margin: 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 5vh;
  margin: 0;
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

.logo:hover {
  transform: scale(1.3);
}

.theme-btn {
  margin-left: auto;
  padding: 0;
  width: 5vh;
  height: 5vh;
  font-size: 2vh;
}

.github-btn {
  width: 5vh;
  height: 5vh;
  font-size: 1vh;
}

@media (max-width: 400px) {
  body {
    background-image: none;
  }

  .app-bar {
    min-height: 7vh;
    max-height: 7vh;
    margin: 0;
    padding: 0;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: 7vh;
    margin: 0;
    padding: 0;
  }

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: 7vh;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6vh;
    margin: 0 auto;
  }

  .theme-btn {
    margin-left: auto;
    width: 4vh;
    height: 4vh;
    font-size: 2vh;
    bottom: 1vh;
  }

  .github-btn {
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
  margin-top: 10vh;
}

.footer {
  max-height: 10vh;
  padding: 0 5vw;
}
</style>
