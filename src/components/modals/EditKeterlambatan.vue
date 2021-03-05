<template>
  <div class="keterlambatan" v-if="allInquirys">
    <div class="head flex flex-row-reverse justify-between">
      <button class="px-4 text-xl" @click="$emit('close-keterlambatan')"><i class="fa fa-close"></i></button>
      <Header title="Ubah Kehadiran"/>
      <span class="px-4"></span>
    </div>
    <p class="text-base px-8 pt-4">Durasi Keterlambatan</p>
    <div class="button mt-1">
      <button class="min" @click="allInquirys.total_kehadiran -= 1"><i class="text-4xl font-semibold">-</i></button>
      <h3 class="text-xl">{{ allInquirys.total_kehadiran }} Hari</h3>
      <button class="plus" @click="allInquirys.total_kehadiran += 1"><i class="text-3xl font-semibold">+</i></button>
    </div>
    <div class="bundle px-8 flex justify-between py-6 -mt-4">
      <button class="hapus w-32 h-12 font-semibold" @click="$emit('close-keterlambatan')">Hapus</button>
      <button class="simpan w-32 h-12 font-semibold" @click="$emit('close-keterlambatan')">Simpan</button>
    </div>
  </div>
</template>

<script>
import Header from '../Header'

export default {
  name: 'EditKeterlambatan',
  components: {
    Header
  },
  props: {
    allInquirys: Object
  }
}
</script>

<style scoped>
.keterlambatan {
  border-radius: 10px 10px 0 0;
  width: 65%;
  height: 25%;
}

.head {
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #c5c5c5;
}

.button {
  display: flex;
  justify-content: space-between;
  border: 1px solid #C8D0DD;
  border-radius: 3px;
  margin: 1.5rem 2rem;
  height: 3rem;
}

i {
  color: #0052F5;
}

.button h3 {
  padding-top: 8px
}

.min {
  border-right: 1px solid #C8D0DD;
  width: 3rem;
}

.hapus {
  border: 1px solid #EB5757;
  border-radius: 3px;
  color: #EB5757;
}

.simpan {
  background-color: #206CFF;
  color: #fff;
  border-radius: 3px
}

.plus {
  border-left: 1px solid #C8D0DD;
  width: 3rem;
}

</style>