<template>
  <v-container>
    <h1>Just one last step to your dream trip.</h1>
    <br>
    <p>We have put together an individual trip for you based on your preferences. <br> In order to finalize your booking, please enter your personal details in the form below.</p>
    <br>
    <v-text-field
        v-model="first"
        :rules="[rules.required, rules.counter]"
        color="primary"
        label="First name"
    ></v-text-field>

    <v-text-field
        v-model="last"
        :rules="[rules.required, rules.counter]"
        color="primary"
        label="Last name"
    ></v-text-field>

    <v-text-field
        v-model="mailAddress"
        :rules="[rules.required, rules.email]"
        color="primary"
        label="E-mail"
    ></v-text-field>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      first: null,
      last: null,
      mailAddress: null,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 30 || 'Max 30 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid E-mail.'
        },
      }
    }
  },
  methods : {
    isValid() {
      return this.first && this.last && this.mailAddress;
    },
    getPersonalDetails() {
      return {
        first: this.first,
        last: this.last,
        mailAddress: this.mailAddress
      };
    }
  }
};
</script>

<style>


@media (max-width: 600px) {
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