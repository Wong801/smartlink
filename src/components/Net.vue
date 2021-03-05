<template>
  <div class="py-4 px-8">
    <div class="total text-2xl font-bold flex justify-between">
      <h1>Total Gaji Bersih <i class="fa fa-check-circle"></i></h1>
      <TotalNet :sumAll="sumAll" />
    </div>
  </div>
</template>

<script>
import TotalNet from './totals/TotalNet'

export default {
  name: 'Net',
  components: {
    TotalNet
  },
  props: {
    sumAll: Number
  }
}
</script>

<style scoped>
h1 {
  color: #0052F5;
}
h1 i {
  color: #27AE60 !important;
}
</style>