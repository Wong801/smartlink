<template>
  <div>
    <h1 class="text-2xl font-semibold">{{ sumKomisi | currency }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TotalCommission',
  props: {
    sumKomisi: Number
  }
}
</script>

<style>

</style>