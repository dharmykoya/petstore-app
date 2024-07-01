<template>
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'MainLayout',
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  