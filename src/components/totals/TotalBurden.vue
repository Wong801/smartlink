<template>
  <div>
    <h1 class="text-2xl font-semibold">(-) {{ sumTanggungan | currency }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TotalBurden',
  props: {
    sumTanggungan: Number
  }
}
</script>

<style scoped>
h1 {
  color: #EB5757;
}
</style>