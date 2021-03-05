<template>
  <div class="pembayaran" v-if="allInquirys">
    <div class="flex justify-between detail px-8">
      <router-link to="/">
        <i class="fa fa-arrow-left py-6"></i>
      </router-link>
      <Header title="Detail Pembayaran" class="text-center font-semibold"/>
      <span></span>
    </div>
    <div class="text-xl px-8 py-4">
      <div class="flex justify-between">
        <h1>Subtotal Gaji</h1>
        <TotalSalary :sumGaji="sumGaji" />
      </div>
      <div class="flex justify-between pt-2">
        <h1>Subtotal Upah</h1>
        <TotalUpah :sumUpah="sumUpah" />
      </div>
      <div class="flex justify-between pt-2">
        <h1>Subtotal Komisi</h1>
        <TotalCommission :sumKomisi="sumKomisi" />
      </div>
      <div class="flex justify-between pt-8">
        <h1>Gaji Kotor</h1>
        <TotalGross :sumKotor="sumKotor"/>
      </div>
      <div class="flex justify-between py-8">
        <h1 class="burden">Tanggungan</h1>
        <TotalBurden :sumTanggungan="sumTanggungan" />
      </div>
    </div>
    <div class="flex justify-between net py-8 px-8">
      <h1 class="text-2xl font-bold total">Total Gaji Bersih</h1>
      <TotalNet :sumAll="sumAll"/>
    </div>
    <div class="bank mt-4 px-8 py-8" v-if="allBank">
      <form @submit="onSubmit" class="flex flex-col">
        <label for="bank" class="font-semibold">Bayar Dari Rekening<i class="text-lg">*</i></label>
        <select name="bank" required class="h-12 mt-4" v-model="bank" @change="dataSelected">
          <option value="" disabled selected><span>Pilih Rekening Bank</span></option>
          <option v-for="(bank, index) in allBank" :value="bank" :key="index" >{{ bank.bank }}</option>
        </select>
        <label for="date" class="mt-6 font-semibold">Dicatat Pada Tanggal<i class="text-lg">*</i></label>
        <datepicker name="date" :lang="lang" type="datetime" :format="format" :placeholder="placeholder" v-model="time"></datepicker>
        <label for="keterangan" class="mt-6 font-semibold">Keterangan</label>
        <input type="text" class="mt-3" v-model="keterangan" placeholder="Tambah keterangan...">
        <input type="submit" value="Submit Gaji" class="mt-20 submit text-xl">
      </form>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TotalSalary from '@/components/totals/TotalSalary'
import TotalUpah from '@/components/totals/TotalUpah'
import TotalCommission from '@/components/totals/TotalCommission'
import TotalGross from '@/components/totals/TotalGross'
import TotalBurden from '@/components/totals/TotalBurden'
import TotalNet from '@/components/totals/TotalNet'
import Datepicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios'
import router from '../router'
import qs from 'qs'
import 'vue2-datepicker/locale/id';

export default {
  name: 'Detail',
  components: {
    Header,
    TotalSalary,
    TotalUpah,
    TotalCommission,
    TotalGross,
    TotalBurden,
    TotalNet,
    Datepicker
  },
  data() {
    return {
      isDone: false,
      format: 'DD-MMMM-YYYY',
      placeholder: 'Pilih Tanggal',
      lang: 'id',
      time: null,
      bank: '',
      keterangan: '',
    }
  },
  props: [
    'allInquirys',
    'sumGaji',
    'sumUpah',
    'sumKomisi',
    'sumKotor',
    'sumTanggungan',
    'sumAll'
  ],
  methods: {
    onSubmit(e) {
      e.preventDefault();
      
      if(!this.time) {
        alert('Tambahkan tanggal')
        return
      }

      const newData = {
        allInquirys: { ...this.allInquirys },
        sumGaji: this.sumGaji,
        sumUpah: this.sumUpah,
        sumKomisi: this.sumKomisi,
        sumKotor: this.sumKotor,
        sumTanggungan: this.sumTanggungan,
        sumAll: this.sumAll,
        rekening: {
          bank: this.bank.bank,
          nomor: this.bank.nomor,
          pemilik: this.bank.pemilik
        },
        tanggal_catat: this.time,
        keterangan: this.keterangan,
      }
      axios.post('https://dev-bos.smartlink.id/salary/save', qs.stringify(newData))
      .then(
        (response) => (console.log(response)),
        router.push({
        name: 'Form',
        params: { ...newData }
      })
      )
      .catch(err => console.log(err))
      this.bank = '',
      this.date = '',
      this.reminder = ''

      
    },
    dataSelected(){
      this.bank
      this.nama
      this.nomer
    }
  },
  computed: {
    allBank() {
      return this.$store.getters.allBank;
    }
  },
  async created() {
    this.isDone = await this.$store.dispatch('fetchBank')
  }
}
</script>

<style scoped>
.pembayaran {
  background-color: #F2F5F7;
}

.detail {
  border-bottom: 1px solid #c5c5c5;
}
.burden {
  color: #EB5757;
}

.net {
  border-top: 2px solid #c5c5c5;
  border-style: dashed
}

.total,
i {
  color: #0052F5;
}

select,
input {
  border: 1px solid #c5c5c5;
  border-radius: 3px;
}

.mx-datepicker {
  width: 100%;
  margin-top: 1rem;
}

.submit {
  border-radius: 3px;
  background-color: #0052F5;
  color: #fff;
  height: 4rem;
}

</style>