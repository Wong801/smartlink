<template>
  <div>
    <h1 class="text-2xl font-semibold">{{ sumUpah | currency }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TotalUpah',
  props: {
    sumUpah: Number
  }
}
</script>

<style>

</style>