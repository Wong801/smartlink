<template>
  <div>
    <h1 class="text-2xl font-semibold">{{ sumGaji | currency }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TotalSalary',
  props: {
    sumGaji: Number
  }
}
</script>

<style scoped>

</style>