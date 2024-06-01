<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-center">
        <img src="test.png" alt="Logo" class="logo">
      </v-toolbar-title>
    </v-app-bar>

    <v-container>
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
          <v-btn v-if="currentStep < steps.length - 1" @click="nextStep" :disabled="currentStep === steps.length - 1">Next</v-btn>
          <v-btn v-if="currentStep === steps.length - 1" @click="submitForm">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import PeopleCountInput from "./components/PeopleCountInput.vue";
import VacationTypeInput from "./components/VacationTypeInput.vue";
import AccommodationTypeInput from "./components/AccommodationTypeInput.vue";
import MaxPriceInput from "./components/MaxPriceInput.vue";

export default {
  name: "App",
  components: {
    PeopleCountInput,
    VacationTypeInput,
    AccommodationTypeInput,
    MaxPriceInput,
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        "PeopleCountInput",
        "VacationTypeInput",
        "AccommodationTypeInput",
        "MaxPriceInput",
      ],
      formData: {
        peopleCount: null,
        vacationType: null,
        accommodationType: null,
        maxPrice: null,
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
      }
    },
    submitForm() {
      this.updateFormData();
      alert(`Persons: ${this.formData.peopleCount}\nBudget: ${this.formData.maxPrice}\nVacation Type: ${this.formData.vacationType}\nAccommodation Type: ${this.formData.accommodationType}`);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  appearance: none;
}

.progress-bar::-webkit-progress-value {
  background-color: #89cff0;
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
