<template>
  <div v-if="allInquirys" class="addKomisi">
    <div class="head flex flex-row-reverse justify-between">
      <button class="px-4 text-xl" @click="$emit('close-edit-komisi')"><i class="fa fa-close" ></i></button>
        <Header title="Ubah Komisi" />
      <span class="px-4"></span>
    </div>
    <div class="px-6 py-4 flex justify-between form">
      <div method="" class="flex flex-col w-full">
        <p class=" mt-4 mb-2 font-semibold">Nama Komisi</p>
        <input type="text" name="komisi" v-model="komisi.nama" class="input">
        <p class=" mt-4 mb-2 font-semibold">Nominal</p>
        <div class="bundle flex w-full">
          <div class="currency">
          <h1 class="text-lg font-semibold text-center py-3">Rp</h1>
          </div>
          <input type="text" name="nominal" v-model="komisi.nominal" class="text-lg w-full">
        </div>
        <div class="btn flex justify-between pt-6">
          <input type="button" value="Hapus" class="hapus font-semibold text-lg">
          <input type="submit" value="Simpan" class="simpan font-semibold text-lg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header'

export default {
  name: 'AddCommission',
  components: {
    Header
  },
  props: {
    allInquirys: Object,
    komisi: Object
  }
}
</script>

<style scoped>
.addKomisi {
  border-radius: 10px 10px 0 0;
  width: 80vw;
}

.btn input:hover {
  cursor: ponter;
}

.head {
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #c5c5c5;
}

p {
  color: #6F7287;
}

.bundle {
  border: 1px solid #c5c5c5;
  border-radius: 5px;
}

.currency {
  width: 15vw;
  background-color: #F6F6F6;
  border-right: 1px solid #c5c5c5;
  border-radius: 5px 0 0 5px;
}

.bundle input {
  border: none;
  border-radius: 0 5px 5px 0;
}

.input {
  border: 1px solid #c5c5c5;
  border-radius: 5px;
}

.hapus {
  width: 45%;
  border: 1px solid #EB5757;
  background-color: #fff;
  border-radius: 3px;
  color: #EB5757;
  height: 4rem;
}

.simpan {
  width: 45%;
  background-color: #206CFF;
  color: #fff;
  border-radius: 3px;
  height: 4rem;
}
</style>