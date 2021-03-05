import axios from 'axios';

const bank = {
    state: () => ({
        bank: null
    }),
    getters: {
        allBank: state => state.bank
    },
    mutations: {
        setBank(state, bank) {
            state.bank = bank
        }
    },
    actions: {
        async fetchBank({commit}) {
            const response = await axios.get('https://dev-bos.smartlink.id/salary/bank')
            await commit('setBank', response.data.data)
            return true
        },
    }
}

export default bank