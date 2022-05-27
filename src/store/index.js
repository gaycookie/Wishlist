import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    search: '',
    theme: 'primary',
  },
  getters: {
    products: state => state.products,
    search: state => state.search
  },
  mutations: {
    addProduct(state, product) {
      state.products.push(product);
    },
    removeProduct(state, name) {
      state.products = state.products.filter(product => product.name !== name);
    },
    updateProduct(state, product_name, new_product) {
      state.products = state.products.map(product => {
        if (product.name === product_name) {
          return new_product
        }
        return product
      });
    },
    clearProducts(state) {
      state.products = [];
    },
    sortByTimestamp(state) {
      state.products = state.products.sort((a, b) => {
        return a.timestamp - b.timestamp;
      })
    },
    getFromLocalStorage(state) {
      const products = localStorage.getItem('products');
      
      if (products) {
        state.products = JSON.parse(products);
      } else {
        localStorage.setItem('products', JSON.stringify([]));
      }
    },
    setSearch(state, search) {
      state.search = search;
    }
  },
  actions: {
    addProduct({ commit }, product) {
      commit('addProduct', product);
    },
    removeProduct({ commit }, name) {
      commit('removeProduct', name);
    },
    updateProduct({ commit }, product_name, new_product) {
      commit('updateProduct', product_name, new_product);
    },
    clearProducts({ commit }) {
      commit('clearProducts');
    },
    sortByTimestamp({ commit }) {
      commit('sortByTimestamp');
    },
    getFromLocalStorage({ commit }) {
      commit('getFromLocalStorage');
    },
    setSearch({ commit }, search) {
      commit('setSearch', search);
    }
  },
  modules: {
    
  }
})
