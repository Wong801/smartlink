<template>
  <header>
    <h1 class="text-xl">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<style scoped>
header {
  padding: 1rem 0;
}
</style>