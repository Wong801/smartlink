<template>
  <div>
    <h1 class="text-2xl font-semibold">{{ sumKotor | currency }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TotalGross',
  props: {
    sumKotor: Number
  }
}
</script>

<style scoped>
h1 {
  color: #00A88A;
}
</style>