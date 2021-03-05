<template>
  <div class="editGaji" v-if="allInquirys">
    <div class="head flex flex-row-reverse justify-between">
      <button class="px-4 text-xl" @click="$emit('close-edit-gaji-pokok')"><i class="fa fa-close"></i></button>
      <Header title="Ubah Gaji Pokok"/>
      <span class="px-4"></span>
    </div>
    <p class="px-6 mt-4 -mb-2 font-semibold">Nominal</p>
    <div class="px-6 py-4 flex justify-between form">
      <div class="bundle flex">
        <div class="currency">
          <h1 class="text-lg font-semibold text-center py-3">Rp</h1>
        </div>
        <input type="text" name="gaji" v-model="allInquirys.pengaturan_gaji[0].nominal" class="text-lg">
      </div>
      <span class="py-4">X</span>
      <div class="bundle flex">
        <input type="text" name="periode" v-model="allInquirys.total_periode">
        <div class="periode">
          <h1 class="text-lg font-semibold text-center py-3">Periode</h1>
        </div>
      </div>
    </div>
    <div class="px-6 pb-2">
      <div class="total flex justify-between pt-2 text-lg font-semibold">
        <h1>Jumlah</h1>
        <h1>{{ allInquirys.pengaturan_gaji[0].nominal * allInquirys.total_periode | currency }}</h1>
      </div>
      <button class="btn simpan w-full h-12 text-center font-bold" @click="$emit('close-edit-gaji-pokok')">Simpan</button>
    </div>
  </div>
</template>

<script>
import Header from '../Header'

export default {
  name: 'EditGajiPokok',
  components: {
    Header
  },
  props: {
    allInquirys: Object
  }
}
</script>

<style scoped>

.editGaji {
  border-radius: 10px 10px 0 0;
  width: 75%;
  height: 25%;
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
.total {
  color: #6F7287;
}

.periode h1,
.currency h1 {
  color: #6F7287;
}

.head {
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #c5c5c5;
}

.bundle {
  border: 1px solid #c5c5c5;
  width: 45%;
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

.periode {
  width: 80vw;
  background-color: #F6F6F6;
  border-left: 1px solid #c5c5c5;
  border-radius: 0 5px 5px 0;
}

</style>