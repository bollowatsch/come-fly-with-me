<template>
  <v-container class="container">
    <v-row>
      <v-col :cols="12">
        <h1>Welcome to Come fly with me, where adventure meets convenience!</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <p>Explore Europe like never before with our tailored city trips. Say goodbye to hours of planning and hello to seamless, personalized experiences.</p>
      </v-col>
    </v-row>
    <v-row class="text">
      <v-col :cols="12">
        <h2>How does it work? It’s simple:</h2>
        <ol>
          <li>Tell us Your Preferences: Let us know how many people are traveling, your preferred accommodation type, budget range, travel style, and available dates.</li>
        <li>Leave the Rest to Us: Sit back and relax as our expert team curates the perfect itinerary based on your inputs.</li>
          <li>Surprise Destination: The excitement builds as you wait to discover your destination, revealed just one week before departure! It’s the ultimate thrill for any traveler.</li>
        </ol>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Personalization: No two trips are alike. We tailor each journey to match your unique preferences and interests.</li>
          <li>Convenience: Save time and hassle with our hassle-free booking process. We handle all the details so you can focus on making memories.</li>
          <li>Surprise Element: Experience the joy of anticipation as you eagerly await your surprise destination. It’s like unwrapping a gift with each trip!</li>
        </ul>
        <p>Ready to embark on your next European adventure? Start planning with us today!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getLandingPage() {
      return this;
    },
    isValid() {
      return true;
    }
  },
};
</script>

<style scoped>

.container{
  align-items: center;

}
.text {
  text-align: left;
  padding: 0 0 10px 0;
}
.text h2 {
  margin-top: 1em;
}

@media (max-width: 600px) {

  .container{
    align-items: center;
  }

  .text{
    margin: 4vh;
  }

  h1 {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1rem;
  }

  p,
  li {
    font-size: 0.9rem;
  }
}
</style>