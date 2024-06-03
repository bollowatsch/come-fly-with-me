<script>
export default {
  data() {
    return {
      links: [
        {text: 'Home', url: '/'},
        {text: 'About Us', url: '/about'},
        {text: 'Services', url: '/services'},
        {text: 'Contact', url: '/contact'}
      ],
      socialLinks: [
        {icon: 'mdi-facebook', url: 'https://facebook.com'},
        {icon: 'mdi-twitter', url: 'https://twitter.com'},
        {icon: 'mdi-instagram', url: 'https://instagram.com'}
      ]
    };
  }
};
</script>

<template>
  <v-footer
      app
      padless
  >
    <v-card
        flat
        tile
        class="footer-card"
    >
      <v-card-text>
        <v-container
        class="container">
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
             <p>&copy; Come Fly with me</p>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <h3>Quick Links</h3>
              <v-list dense>
                <v-list-item v-for="link in links" :key="link.text">
                  <v-list-item-content>
                    <v-list-item-title>
                      <a :href="link.url">{{ link.text }}</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <h3>Follow Us</h3>
              <v-btn
                  v-for="social in socialLinks"
                  :key="social.icon"
                  :href="social.url"
                  icon
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style scoped>

v-footer{
  width: 100%;
  display:flex;
  justify-content: center;
}
.footer-card {
  color: white;
}

.footer-card h3 {
  color: #ecf0f1;
}

.footer-card a {
  color: #ecf0f1;
  text-decoration: none;
}

.footer-card a:hover {
  color: #3498db;
}

.footer-card .v-btn {
  color: #ecf0f1;
}

.footer-card .v-btn:hover {
  background-color: transparent;
  color: #3498db;
}
</style>