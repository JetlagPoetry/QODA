<template>
  <v-container class="homepage" fluid>
    <v-row style="height:100%" align="center" justify="center">
      <v-col md="10" lg="8" class="text-center">
          <h1 class="display-3 mb-10 col-lg-10 mx-auto">{{$t('home.title')}}</h1>
          <div class="body-2 mx-auto">{{$t('home.introduction')}}</div>
          <div class="mb-10">
            <a class="caption" href="http://mcgill-fammedstudies-recherchemedfam.pbworks.com/w/page/129374202/qoda" target="_blank">
              <span>{{$t('home.reference')}}</span>
            </a>
            <v-icon small>mdi-open-in-new</v-icon>
          </div>
          <v-btn class="col-4 " :x-large="$vuetify.breakpoint.xl" outlined @click="toQODA">
            ENTER QODA TOOL
          </v-btn>
      </v-col>
    </v-row>
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
<style scoped="">
.homepage {
  background: rgb(251,242,191);
background: linear-gradient(162deg, rgba(251,242,191,1) 0%, rgba(142,199,195,1) 100%);
  height: 100%
}
</style>