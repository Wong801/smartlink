<template>
  <div class="addTanggungan" v-if="allInquirys">
    <div class="head flex flex-row-reverse justify-between">
      <button class="px-4 text-xl" @click="$emit('close-edit-tanggungan')"><i class="fa fa-close" ></i></button>
        <Header title="Bayar Tanggungan / Denda" />
      <span class="px-4"></span>
    </div>
    <div class="px-6 py-4 flex justify-between form">
      <div class="flex flex-col w-full">
        <label for="nama" class=" mt-4 mb-2 font-semibold">Nama Tanggungan</label>
        <input type="text" name="tanggungan" v-model="tanggungan.nama" placeholder="Contoh: Ganti Barang Hilang" class="input">
        <label for="nominal" class=" mt-4 mb-2 font-semibold">Nominal Pembayaran</label>
        <div class="bundle flex w-full">
          <div class="currency">
            <h1 class="text-lg font-semibold text-center py-3">Rp</h1>
          </div>
            <input type="text" name="nominal" v-model="tanggungan.nominal" class="text-lg w-full">
        </div>
        <label for="keterangan" class=" mt-4 mb-2 font-semibold">Keterangan</label>
        <input type="text" name="keterangan" v-model="tanggungan.keterangan" placeholder="Contoh: Baju yang hilang berwarna merah" class="input">
        <div class="btn flex justify-between pt-6">
          <button class="hapus font-semibold text-lg">Hapus</button>
          <button class="simpan font-semibold text-lg">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header'

export default {
  name: 'AddBurden',
  components: {
    Header
  },
  props: {
    allInquirys: Object,
    tanggungan: Object
  }
}
</script>

<style scoped>
.addTanggungan {
  border-radius: 10px 10px 0 0;
  width: 80vw;
}

.head {
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #c5c5c5;
}

label {
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
  background-color: #F6F6F6;
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