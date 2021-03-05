<template>
  <div>
    <h1 class="text-2xl font-bold">{{ sumAll | currency }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TotalNet',
  props: {
    sumAll: Number
  }
}
</script>

<style scoped>
h1 {
  color: #0052F5;
}
</style>