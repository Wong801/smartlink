<template>
  <div class="editGaji" v-if="allInquirys">
    <div class="head flex flex-row-reverse justify-between">
      <button class="px-4 text-xl" @click="$emit('close-edit-gaji-tambahan')"><i class="fa fa-close" ></i></button>
      <Header :title="'Ubah ' + gaji.nama"/>
      <span class="px-4"></span>
    </div>
    <p class="px-6 mt-4 -mb-2 font-semibold">Nominal</p>
    <div class="px-6 py-4 flex justify-between form">
      <div class="bundle flex">
        <div class="currency">
          <h1 class="text-lg font-semibold text-center py-3">Rp</h1>
        </div>
        <input type="text" name="gaji" v-model="gaji.nominal" class="text-lg">
      </div>
      <span class="py-4">X</span>
      <h1 class="py-4 text-xl">{{ allInquirys.total_kehadiran }} Hari</h1>
    </div>
    <div class="px-6 pb-2">
      <div class="total flex justify-between pt-2 text-lg font-semibold">
        <h1>Jumlah</h1>
        <h1>{{ gaji.nominal * allInquirys.total_kehadiran | currency }}</h1>
      </div>
      <button class="btn simpan w-full h-12 text-center font-bold" @click="$emit('close-edit-gaji-tambahan')">Simpan</button>
    </div>
  </div>
</template>

<script>
import Header from '../Header'

export default {
  name: 'EditGajiTambahan',
  components: {
    Header
  },
  props: {
    allInquirys: Object,
    gaji: Object
  }
}
</script>

<style scoped>
.editGaji {
  border-radius: 10px 10px 0 0;
  width: 80vw;
}

.simpan {
  background-color: #206CFF;
  color: #fff;
  border-radius: 3px
}

.form {
  border-bottom: 1px solid #c5c5c5;
  border-style: dashed;
}

i {
  color: #0052F5;
}

p,
.total,
.currency h1 {
  color: #6F7287;
}

.head {
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #c5c5c5;
}

.bundle {
  border: 1px solid #c5c5c5;
  width: 50%;
  border-radius: 5px;
}

input {
  border: none;
  border-radius: 5px;
  width: 100%;
}

.btn {
  margin: 1rem auto;
}

.currency {
  width: 15vw;
  background-color: #F6F6F6;
  border-right: 1px solid #c5c5c5;
  border-radius: 5px 0 0 5px;
}


</style>