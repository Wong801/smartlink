import axios from 'axios';

const inquiry = {
    state: () => ({
        inquirys: null
    }),
    getters: {
        allInquirys: state => state.inquirys
    },
    mutations: {
        setInquirys(state, inquirys) {
            state.inquirys = inquirys
        }
    },
    actions: {
        async fetchInquirys({commit}) {
            const response = await axios.get('https://dev-bos.smartlink.id/salary/inquiry')
            await commit('setInquirys', response.data.data)
            return true
        },
    }
}

export default inquiry