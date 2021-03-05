<template>
  <div class="payment" v-if="allInquirys">
    <Header title="Detail Faktur" class="text-center font-semibold" />
    <div class="user py-4 px-8">
      <h1 class="text-2xl font-semibold">{{allInquirys.id_karyawan}}</h1>
      <p class="text-base">Dicatat: {{ tanggalCatat }}</p>
    </div>
    <div class="py-4 px-8">
      <h1 class="text-2xl font-semibold">{{ allInquirys.nama_karyawan }}</h1>
      <p class="text-base">Periode: {{ tanggalAwal }} - {{ tanggalAkhir }}</p>
    </div>
    <div class="card">
      <div class="px-8 py-4">
        <h1 class="text-xl font-bold pb-2">Gaji</h1>
        <div class="inquiry user">
          <div v-for="(item, index) in allInquirys.pengaturan_gaji" :key="index">
            <div class="flex justify-between py-2">
              <div class="detail">
                <h3 class="text-lg font-sans font-semibold">{{ item.nama }}</h3>
                <p class="text-base font-medium">{{ item.nominal | currency }} x {{ item.id === 1 ? allInquirys.total_periode + ' periode' : allInquirys.total_kehadiran + ' kehadiran' }}</p>
              </div>
              <div class="flex py-2">
                <h3 class="text-lg font-sans font-semibold">{{ item.id === 1 ? item.nominal * allInquirys.total_periode : item.nominal * allInquirys.total_kehadiran | currency }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-2 flex justify-between text-xl font-bold">
          <h1>Subtotal Gaji</h1>
          <TotalSalary :sumGaji="sumGaji"/>
        </div>
      </div>
    </div>
    <div class="card">
      <Header title="Upah Borongan" class="header2 text-xl font-bold"/>
      <div class="px-8 py-2">
        <div class="border-bot user">
          <div v-for="upah in mappingUpah" :key="upah.id" class="flex justify-between">
            <div class="bundle">
              <h3 class="text-lg font-sans font-semibold">{{ upah.nama }}</h3>
              <p class="text-base font-medium">{{ upah.berat }}</p>
            </div>
          <div class="total flex p-3">
            <h3 class="text-lg font-sans font-semibold">{{ upah.nominal | currency }}</h3>
          </div>
          </div>
        </div>
        <div class="py-2 flex justify-between text-xl font-bold">
          <h1>Subtotal Upah</h1>
          <TotalUpah :sumUpah="sumUpah" />
        </div>
      </div>
    </div>
    <div class="card">
      <Header title="Komisi" class="header2 text-xl font-bold" />
      <div class="komisi">
        <div class="commission">
          <div v-for="(item, index) in allInquirys.komisi" :key="index" class="flex justify-between py-2">
            <h1 class="text-lg font-semibold">{{ item.nama }}</h1>
            <div class="flex py-2">
              <h1 class="text-lg font-semibold">{{ item.nominal | currency }}</h1>
            </div>
          </div>
        </div>
        <div class="subtotal-komisi text-xl font-bold flex justify-between">
          <h1>Subtotal Komisi</h1>
          <TotalCommission :sumKomisi="sumKomisi" />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="px-8 py-4">
        <div class="totalGross text-2xl font-semibold flex justify-between">
          <h1>Total Gaji Kotor</h1>
          <TotalGross :sumKotor="sumKotor" />
        </div>
      </div>
    </div>
    <div class="card">
      <Header title="Tanggungan" class="header2 text-xl font-bold" />
      <div class="py-4 px-8">
        <div class="burden user">
          <div v-for="(item, index) in allInquirys.tanggungan" :key="index" class="flex justify-between">
            <div class="bundle">
              <h1 class="text-lg font-semibold">{{ item.nama }}</h1>
              <p class="text-base font-medium">{{ item.keterangan }}</p>
            </div>
            <div class="flex py-2 tanggungan">
              <h1 class="text-lg font-semibold">{{ item.nominal | currency }}</h1>
            </div>
          </div>
        </div>
        <div class="py-3 text-xl font-bold flex justify-between">
          <h1>Tanggungan Dibayar</h1>
          <TotalBurden :sumTanggungan="sumTanggungan"/>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="py-4 px-8">
        <div class="total text-2xl font-bold flex justify-between">
          <h1>Total Gaji Bersih <i class="fa fa-check-circle"></i></h1>
          <TotalNet :sumAll="sumAll" />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="py-2 px-8">
        <h3 class="keterangan">Keterangan</h3>
        <h1 class="text-xl">{{ keterangan }}</h1>
      </div>
      <div class="btn py-4 px-8">
        <button class="w-full">
          <div class="link text-center font-semibold text-2xl">
            <p class="py-4">cetak</p>
          </div> 
        </button>
      </div>
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
import dayjs from 'dayjs'


export default {
  name: 'Payment',
  components: {
    Header,
    TotalSalary,
    TotalUpah,
    TotalCommission,
    TotalGross,
    TotalBurden,
    TotalNet,
  },
  props: [
    'allInquirys',
    'sumGaji',
    'sumUpah',
    'sumKomisi',
    'sumKotor',
    'sumTanggungan',
    'sumAll',
    'rekening',
    'tanggal_catat',
    'keterangan'
  ],
  computed: {
    tanggalCatat() {
      let tanggal = dayjs(this.tanggal_catat).format('DD MMMM YYYY')
      return tanggal
    },
    tanggalAwal() {
      let tanggal = dayjs(this.allInquirys.tanggal_awal).format('DD MMMM YYYY')
      return tanggal
    },
    tanggalAkhir() {
      let tanggal = dayjs(this.allInquirys.tanggal_akhir).format('DD MMMM YYYY')
      return tanggal
    },
    mappingUpah() {
      let pengaturanUpah = this.allInquirys.pengaturan_upah
      let pengerjaanUpah = this.allInquirys.pengerjaan_upah
      let result = []
      let obj = {}
      pengaturanUpah.forEach((upah1) => {
        pengerjaanUpah.forEach((upah2) => {
          if(upah1.id === upah2.pengaturan_upah_id) {
            obj.id = upah1.id
            obj.nama = upah1.nama
            obj.berat = upah2.nominal + upah2.satuan
            obj.nominal = upah1.nominal * upah2.nominal
          }
        })
        result.push(obj)
        obj = {}
      })
      return result
    }
  }
}
</script>

<style scoped>

header {
  border-bottom: 1px solid #C5C5C5;
  background-color: #fff;
}

.payment {
  background-color: #F2F5F7;
}

button {
  color: #0052F5;
}

.card {
  margin-top: 1rem !important; 
}

.header2 {
  padding: 1.5rem 2rem !important;
}

.user {
  border-bottom: 1px dashed #C5C5C5;
}

.total button {
  padding-left: 10px;
}

.total i {
  color: #E6E6E6;
}

.btn {
  width: 100%;
}

.layer {
  background-color: #000;
}

.link {
  margin-top: 2rem;
  color: #fff;
  background-color: #00A88A;
  border-radius: 3px;
}

.layer2 {
  background-color: transparent;
}

.total h1 {
  color: #0052F5;
}

.total h1 i {
  color: #27AE60 !important;
}

.totalGross h1 {
  color: #00A88A;
}

.komisi {
  padding: 1rem 2rem;
}

.plus {
  color: #0052F5;
}

.commission {
  border-bottom: 1px solid #C5C5C5;
  border-style: dashed;
}

.subtotal-komisi {
  padding: 1rem 0;
}

.layer {
  background-color: #000;
}

.layer2 {
  background-color: transparent;
}

.tanggungan {
  color: #EB5757 !important;
}

.keterangan {
  color: #6F7287
}
</style>