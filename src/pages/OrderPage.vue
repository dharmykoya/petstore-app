<template>
  <order-listing />
</template>
<script setup>
import OrderListing from '../components/Order/OrderListing.vue'
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
</script>

<style scoped>
/* Add scoped styles as needed */
</style>
