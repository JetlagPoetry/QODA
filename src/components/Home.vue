<template>
  <v-container fluid style="padding:0; margin:0">
    <v-parallax
      style="background: linear-gradient(to right bottom, rgba(240,243,189,1) 0%, rgba(0,168,150,1) 49%, rgba(5,102,141,1) 100%);height: 100vh;">
      <v-btn class="col-4 " :x-large="$vuetify.breakpoint.xl" outlined color="#fff" @click="toQODA">
        OPEN QODA TOOL
      </v-btn>
    </v-parallax>
  </v-container>
</template>
<script>
export default {
  name: 'Home',

  components: {
  },

  computed:{
  },

  data: () => ({
  }),

  watch: {
  },

  methods: {
    
    toQODA() {
      this.$router.push('/qoda').catch(err => err);
    },
  }
};
</script>