<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      flat
    >

      <div class="d-flex align-center">
        <v-img
          alt="QODA"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/logo.png"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="toHOME"
        text
      >
        <span class="mr-2">{{$t('nav.home')}}</span>
      </v-btn>
      <v-btn
        @click="toQODA"
        text
      >
        <span class="mr-2">{{$t('nav.tool')}}</span>
      </v-btn>
      
      <v-btn
        @click="changeLanguage"
        text
      >
        <span class="mr-2">{{$t('nav.lang')}}</span>
        <v-icon><v-icon>mdi-earth</v-icon></v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),

  methods: {
    toHOME() {
      this.$router.push('/').catch(err => err);
    },
    toQODA() {
      this.$router.push('/qoda').catch(err => err);
    },
    changeLanguage(){
      if(this.$i18n.locale==='fr'){
        this.$i18n.locale='en';
      }else{
        this.$i18n.locale='fr';
      }
    }
  }
};
</script>
