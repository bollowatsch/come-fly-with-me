<script>
export default {
  props: { data: [],
    destination: String },
  computed: {
    timelineData() {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      const formatDate = (date) => new Date(date).toLocaleDateString('en-US', options); // Change 'en-US' to your locale if needed
      return [
        {label: 'Name', value: this.data.firstName + ' ' + this.data.lastName},
        {label: 'E-Mail', value: this.data.mailAddress},
        {label: 'Travelers', value: this.data.peopleCount},
        {label: 'Destination', value: this.destination},
        {label: 'Total Price', value: this.data.totalPrice},
        {label: 'Begin Date', value: formatDate(this.data.beginDate) },
        {label: 'End Date', value: formatDate(this.data.endDate) },
        {label: 'Flight Number', value: this.data.flightNumber},
        {label: 'Hotel', value: this.data.hotel.hotelName}
      ]
    }
  }
};
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
        color="surface-variant"
        height="200"
        src="https://i.ds.at/49KVyA/rs:fill:750:0/plain/2021/10/06/0DE7B2EB-4945-40EF-AD37-AC1F15FE7EF5.jpeg"
        alt="Hotel Picture"
        cover
    >
      <v-toolbar-title class="text-h6" text="Your Booking Details"></v-toolbar-title>
    </v-img>

    <v-card-text>
      <v-timeline align="start" density="compact">
        <v-timeline-item
            v-for="item in timelineData"
            :key="item._id"
            size="x-small"
        >
          <div class="mb-4">
            <div>
              <strong>{{item.label}}</strong>
            </div>
            <div>{{ item.value }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<style scoped>

.mb-4 {
  text-align: left;
}

.text-h6 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
}

</style>