<template>
  <v-app>
    <v-app-bar
        app
        class="app-bar">
      <v-app-bar-title class="hidden-sm-and-down">Come Fly </v-app-bar-title>
      <v-toolbar-title class="text-center">
        <img src="test.png" alt="Logo" class="logo">
      </v-toolbar-title>
      <v-app-bar-title class="hidden-sm-and-down">with me!</v-app-bar-title>
      <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
    </v-app-bar>
    <v-main class="container">
      <v-row>
        <v-col cols="12">
          <v-spacer class="space-ah"></v-spacer>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <progress :value="currentStep + 1" :max="steps.length" class="progress-bar"></progress>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <component :is="currentComponent" ref="currentComponent"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-btn @click="previousStep" :disabled="currentStep === 0">Back</v-btn>
          <v-btn v-if="currentStep < steps.length - 1" @click="nextStep" :disabled="currentStep === steps.length - 1">
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

const axios = require('axios')

export default {
  name: "App",
  components: {
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
}

.container {
  flex-direction: column;
  flex-grow: 1;
  padding: 5vh 5vw;
}

.app-bar {
  min-height: 60px;
  max-height: 5vh;
}

.footer {
  min-height: 60px;
  max-height: 5vh;
  display: flex;
  justify-content: space-between;
}

#app {
  display: flex;
  align-items: center;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //color: #2c3e50;
  margin-top: 60px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  appearance: none;
}

.progress-bar::-webkit-progress-value {
  background-color: rgba(var(--v-theme-primary));
  border-radius: 5px 0 0 5px;
}

.logo {
  margin-top: 25px;
  height: 100px;
}

.space-ah {
  margin-top: 100px;
}
</style>
