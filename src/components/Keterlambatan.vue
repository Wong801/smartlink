<template>
  <div class="flex justify-between py-4 px-8">
    <p class="text-base">Masuk {{ allInquirys.total_kehadiran }} Hari</p>
    <div>
      <button class="font-semibold" @click="toggleKehadiran = !toggleKehadiran">Ubah Kehadiran</button>
      <div v-if="toggleKehadiran" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 layer2">
        <EditKeterlambatan @close-keterlambatan="closeKeterlambatan" :allInquirys="allInquirys"/>
      </div>
    </div>
    <div v-if="toggleKehadiran" class="fixed z-40 inset-0 opacity-25 layer"></div>
  </div>
</template>

<script>
import EditKeterlambatan from './modals/EditKeterlambatan'

export default {
  name: 'Keterlambatan',
  components: {
    EditKeterlambatan
  },
  data() {
    return {
      toggleKehadiran: false,
    }
  },
  props: {
    allInquirys: Object
  },
  methods: {
    closeKeterlambatan() {
      this.toggleKehadiran = !this.toggleKehadiran
    }
  }
}
</script>

<style scoped>
button {
  color: #0052F5;
}

.layer2 {
  background-color: transparent;
}

.layer {
  background-color: black;
}
</style>