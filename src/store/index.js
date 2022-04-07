import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentList: [],
        categoryList: []
    },
    getters: {
        getPaymentList: state => state.paymentList,
        getFullPaymentValue: state => {
            return state.paymentList.reduce((res, cur) => res + +cur.value, 0)
        },
        getCategoryList: state => state.categoryList,
    },
    mutations: {
        setPaymentListData(state, payload) {
            state.paymentList = payload
        },
        addDataPaymentList(state, payload) {
            payload.id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
            state.paymentList.push(payload)
        },
        editDataPaymentList(state, item) {
            const index = state.paymentList.findIndex(el => el.id == item.id);
            state.paymentList[index].date = item.date;
            state.paymentList[index].category = item.category;
            state.paymentList[index].value = item.value;
        },
        deleteDataPaymentList(state, id) {
            const index = state.paymentList.findIndex(el => el.id == id);
            state.paymentList.splice(index, 1);
        },
        addCategoryList(state, payload) {
            state.categoryList = payload
        },
    },
    actions: {
        fetchData({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = []
                    for (let i = 1; i <= 50; i++) {
                        items.push({
                            date: "23.12.2020",
                            category: "Sport",
                            value: i,
                            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                        })
                    }
                    resolve(items)
                }, 2000)
            }).then(res => {
                commit('setPaymentListData', res)
            })
        },
        fetchCategoryList({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Transport', 'Entertainment'])
                }, 1000)
            }).then(res => {
                commit('addCategoryList', res)
            })
        }
    },
})
