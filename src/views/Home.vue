<template>
  <div class="payment" v-show="isDone" v-if="allInquirys">
    <Header title="Faktur Gaji" class="text-center font-semibold" />
    <div class="user py-4 px-8">
      <h1 class="text-2xl font-semibold">{{ allInquirys.nama_karyawan }}</h1>
      <p class="text-base">{{ allInquirys.tanggal_awal }} - {{ allInquirys.tanggal_akhir }}</p>
    </div>
    <Keterlambatan :allInquirys="allInquirys"/>
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
                <div v-if="item.id === 1" @click="editGajiPokok"><EditButtonBlue /></div>
                <div v-else @click="editGajiTambahan(item)"><EditButtonBlue /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-2 flex justify-between text-xl font-bold">
          <h1>Subtotal Gaji</h1>
          <TotalSalary :sumGaji="sumGaji"/>
        </div>
        <div v-if="toggleGajiPokok" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 layer2">
          <EditGajiPokok :allInquirys="allInquirys" @close-edit-gaji-pokok="editGajiPokok"/>
        </div>
        <div v-if="toggleGajiTambahan" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 layer2">
          <EditGajiTambahan :allInquirys="allInquirys" :gaji="gaji" @close-edit-gaji-tambahan="closeEditGaji"/>
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
            <i class="fa fa-ban text-xl pl-3"></i>
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
        <button @click="addKomisi">
          <i class="fa fa-plus-circle plus"></i>
          <span class="plus text-lg font-semibold">
            Tambahkan komisi lain...
          </span>
        </button>
        <div class="commission">
          <div v-for="(item, index) in allInquirys.komisi" :key="index" class="flex justify-between py-2">
            <h1 class="text-lg font-semibold">{{ item.nama }}</h1>
            <div class="flex py-2">
              <h1 class="text-lg font-semibold">{{ item.nominal | currency }}</h1>
              <div @click="toggleEditKomisi = !toggleEditKomisi"><EditButtonBlue /></div>
            </div>
          </div>
        </div>
        <div class="subtotal-komisi text-xl font-bold flex justify-between">
          <h1>Subtotal Komisi</h1>
          <TotalCommission :sumKomisi="sumKomisi" />
        </div>
        <div v-if="toggleAddKomisi" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 layer2">
          <AddCommission @close-add-komisi="addKomisi" :save="(postKomisi) => getKomisi(postKomisi)"/>
        </div>
        <div v-if="toggleEditKomisi" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 layer2">
          <EditCommission :allInquirys="allInquirys" :komisi="komisi" @close-edit-komisi="closeEditKomisi"/>
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
        <button @click="addTanggungan">
          <i class="fa fa-plus-circle plus"></i>
          <span class="plus text-lg font-semibold">
            Tambahkan pembayaran tanggungan...
          </span>
        </button>
        <div class="burden user">
          <div v-for="(item, index) in allInquirys.tanggungan" :key="index" class="flex justify-between">
            <div class="bundle">
              <h1 class="text-lg font-semibold">{{ item.nama }}</h1>
              <p class="text-base font-medium">{{ item.keterangan }}</p>
            </div>
            <div class="flex py-2 tanggungan">
              <h1 class="text-lg font-semibold">{{ item.nominal | currency }}</h1>
              <div @click="editTanggungan(item)"><EditButtonRed /></div>
            </div>
          </div>
        </div>
        <div class="py-3 text-xl font-bold flex justify-between">
          <h1>Tanggungan Dibayar</h1>
          <TotalBurden :sumTanggungan="sumTanggungan"/>
        </div>
        <div v-if="toggleAddTanggungan" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 layer2">
          <AddBurden @close-add-tanggungan="addTanggungan" :save="(postTanggungan) => getTanggungan(postTanggungan)" :tanggungan="tanggungan"/>
        </div>
        <div v-if="toggleEditTanggungan" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 layer2">
          <EditBurden @close-edit-tanggungan="closeEditTanggungan" :tanggungan="tanggungan" :allInquirys="allInquirys"/>
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
      <div class="btn py-4 px-8">
        <button @click="sendReq" class="w-full">
          <div class="link text-center font-semibold text-2xl">
            <p class="py-4">Berikutnya</p>
          </div> 
        </button>
      </div>
    </div>
    <div v-if="toggleGajiPokok || toggleAddKomisi || toggleAddTanggungan || toggleEditKomisi || toggleEditTanggungan || toggleGajiTambahan" class="fixed z-40 inset-0 opacity-25 layer"></div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Keterlambatan from '@/components/Keterlambatan'
import EditButtonBlue from '@/components/buttons/EditButtonBlue'
import TotalSalary from '@/components/totals/TotalSalary'
import EditGajiPokok from '@/components/modals/EditGajiPokok'
import EditGajiTambahan from '@/components/modals/EditGajiTambahan'
import TotalUpah from '@/components/totals/TotalUpah'
import TotalCommission from '@/components/totals/TotalCommission'
import AddCommission from '@/components/modals/AddCommission'
import EditCommission from '@/components/modals/EditCommission'
import TotalGross from '@/components/totals/TotalGross'
import TotalNet from '@/components/totals/TotalNet'
import TotalBurden from '@/components/totals/TotalBurden'
import AddBurden from '@/components/modals/AddBurden'
import router from '../router'
import EditButtonRed from '@/components/buttons/EditButtonRed'
import EditBurden from '@/components/modals/EditBurden'


export default {
  name: 'Payment',
  components: {
    Header,
    Keterlambatan,
    EditButtonBlue,
    TotalSalary,
    EditGajiPokok,
    EditGajiTambahan,
    TotalUpah,
    TotalCommission,
    AddCommission,
    EditCommission,
    TotalGross,
    TotalNet,
    TotalBurden,
    AddBurden,
    EditButtonRed,
    EditBurden
  },
  data() {
    return {
      isDone: false,
      toggleGajiPokok: false,
      toggleGajiTambahan: false,
      idGaji: Number,
      toggleAddKomisi: false,
      toggleEditKomisi: false,
      toggleAddTanggungan: false,
      toggleEditTanggungan: false,
      idKomisi: Number,
      idTanggungan: Number
    }
  },
  methods: {
    sendReq() {
      router.push({
        name: 'Detail',
        params: {
          allInquirys: this.allInquirys,
          sumGaji: this.sumGaji,
          sumUpah: this.sumUpah,
          sumKomisi: this.sumKomisi,
          sumKotor: this.sumKotor,
          sumTanggungan: this.sumTanggungan,
          sumAll: this.sumAll
        }
      })
    },
    editGajiPokok() {
      this.toggleGajiPokok = !this.toggleGajiPokok
    },
    editGajiTambahan(item) {
      this.toggleGajiTambahan = !this.toggleGajiTambahan
      let obj = this.allInquirys.pengaturan_gaji
      let idGaji = obj.find((x) => x.id === item.id).id
      this.idGaji = idGaji
    },
    closeEditGaji() {
      this.toggleGajiTambahan = !this.toggleGajiTambahan
    },
    editKomisi(item) {
      this.toggleEditKomisi = !this.toggleEditKomisi
      let obj = this.allInquirys.komisi
      let idKomisi = obj.find((x) => x.id === item.id).id
      this.idKomisi = idKomisi
    },
    addKomisi() {
      this.toggleAddKomisi = !this.toggleAddKomisi
    },
    addTanggungan() {
      this.toggleAddTanggungan = !this.toggleAddTanggungan
    },
    editTanggungan(item) {
      this.toggleEditTanggungan = !this.toggleEditTanggungan
      let obj = this.allInquirys.tanggungan
      let idTanggungan = obj.find((x) => x.id === item.id).id
      this.idTanggungan = idTanggungan
    },
    closeEditTanggungan() {
      this.toggleEditTanggungan = !this.toggleEditTanggungan
    },
    closeEditKomisi() {
      this.toggleEditKomisi = !this.toggleEditKomisi
    },
    getKomisi(postKomisi) {
      let komisi = this.allInquirys.komisi
      komisi.push(postKomisi)
    },
    getTanggungan(postTanggungan) {
      let tanggungan = this.allInquirys.tanggungan
      tanggungan.push(postTanggungan)
    }
  },
  computed: {
    allInquirys() {
      return this.$store.getters.allInquirys;
    },
    sumGaji() {
      let gaji = this.allInquirys.pengaturan_gaji
      let periode = this.allInquirys
      let result = []
      let obj = {}
      let total = null
      gaji.map((salary) => {
        total = salary.id === 1 ? salary.nominal * periode.total_periode : salary.nominal * periode.total_kehadiran;
        obj.nominal = total
        result.push(obj)
        obj = {}
      })

      let salary = result
      let object = salary.reduce((total, gaji) => total + gaji.nominal, 0)
      return object
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
    },
    sumUpah() {
      let fee = this.mappingUpah
      let obj = fee.reduce((total, upah) => total + upah.nominal, 0 ) 
      return obj
    },
    sumKomisi() {
      let commission = this.allInquirys.komisi 
      let obj = commission.reduce((total, komisi) => total + komisi.nominal, 0)
      return obj
    },
    sumTanggungan() {
      let burden = this.allInquirys.tanggungan 
      let obj = burden.reduce((total, tanggungan) => total + tanggungan.nominal, 0)
      return obj
    },
    sumKotor() {
      let gaji = this.sumGaji
      let upah = this.sumUpah
      let komisi = this.sumKomisi
      let obj = gaji + upah + komisi
      return obj
    },
    sumAll() {
      let gaji = this.sumGaji
      let upah = this.sumUpah
      let komisi = this.sumKomisi
      let tanggungan = this.sumTanggungan
      let obj = gaji + upah + komisi - tanggungan
      return obj
    },
    gaji() {
      let gaji = this.allInquirys.pengaturan_gaji
      let item = this.idGaji
      let obj = gaji.find((x) => x.id === item)
      return obj
    },
    komisi() {
      let komisi = this.allInquirys.komisi
      let item = this.idKomisi 
      let obj = komisi.find((x) => x.id === item.id)
      return obj
    },
    tanggungan() {
      let tanggungan = this.allInquirys.tanggungan
      let item = this.idTanggungan
      let obj = tanggungan.find((x) => x.id === item.id)
      return obj
    }
  },
  async created() {
    this.isDone = await this.$store.dispatch('fetchInquirys')
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
  color: #fff;
  background-color: #206CFF;
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
</style>