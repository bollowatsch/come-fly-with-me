<template>
  <v-container>
    <h1>Booking Confirmation</h1>
    <br>
    <p>Congratulations! <br> Your booking has been successfully processed. <br><br> We will find the best vacation destination for you based on the following data:</p>
    <br>
    <ul class="no-bullets centered-list">
      <li><v-icon small>mdi-airplane</v-icon> <strong> First Name: </strong> {{ bookingDetails.firstName || 'N/A' }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Last Name: </strong> {{ bookingDetails.lastName }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Email: </strong> {{ bookingDetails.mailAddress }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> People Count: </strong> {{ bookingDetails.peopleCount }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Vacation Type: </strong> {{ bookingDetails.vacationType ? bookingDetails.vacationType.join(', ') : '' }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Accommodation Type: </strong> {{ bookingDetails.accommodationType }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Airport: </strong> {{ bookingDetails.airport }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Max Price: </strong> {{ bookingDetails.maxPrice }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Begin Date: </strong> {{ formatDate(bookingDetails.beginDate) }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> End Date: </strong> {{ formatDate(bookingDetails.endDate)  }}</li>
      <li><v-icon small>mdi-airplane</v-icon> <strong> Number of Nights: </strong> {{ bookingDetails.numberOfNights }}</li>
    </ul>
    <br>
    <p>You will receive an e-mail with further information shortly.</p>
  </v-container>
</template>

<script>
export default {
  methods: {
    isValid() {
      return true;
    },
    formatDate(date) {
      if (!date) return 'N/A';
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('de-DE', options);
    }
  },
  props: {
    bookingDetails: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.no-bullets {
  list-style-type: none;
  padding: 0;
}

.centered-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered-list li {
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  max-width: 500px;
}

.centered-list li v-icon {
  margin-right: 100px;
}


@media (max-width: 600px) {
  h1 {
    font-size: 1.2rem;
  }

  p,
  li {
    font-size: 0.9rem;
  }
}
</style>
