import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export const store = new Vuex.Store({
  namespaced: true,
  state: {
    loading:false,
    catalog:[],
    cartItems:[],
    seletedProduct:[],
    summary:[]
  },
  getters:{
    // get loading status
    getLoadingStatus: (state) => state.loading,

    // get all items
    allCatalog: (state) => state.catalog,

    // get product details
    productDetails: (state) => state.seletedProduct[0],

    //get cart item count
    getItemCount: (state) => state.cartItems.length,

    //get cart items
    cartItems: (state) => state.cartItems,

    // get cart summary
    getSummary: (state) => state.summary[0]
  },
  mutations: {
    // loading status
    SET_LOADING:(state, status) => state.loading = status,

    //fetch data
    FETCH_DATA:(state, data) => state.catalog = data,

    // add item to cart mutation
    ADD_TO_CART:(state, data) => {

      // check product already in the cart
      let index = state.cartItems.findIndex(item => item.id === data.pid);

      if(index<0){

          // find product details
          let product = state.catalog.filter(item => item.id==data.pid)
          product[0].count = data.count

          state.cartItems.unshift(product[0])

      }else{ //update product quantity

        console.log(index);
        console.log(state.cartItems);
        state.cartItems[index].count = data.count
        // let cart_product = state.cartItems.filter(item => item.id==data.pid)
      }

    },

    //get selected product data mutation
    GET_PRODUCT_DATA:(state, pid) => state.seletedProduct = state.catalog.filter(item => item.id==pid),

    // remove item from cart
    REMOVE_ITEM:(state, pid) => {

      let index = state.cartItems.findIndex(item => item.id === pid);

      state.cartItems.splice(index, 1);

    },

    // change product quantity
    CHANGE_QTY:(state, data) => {

      let index = state.cartItems.findIndex(item => item.id === data.pid);

      if(index>=0){

        // find product details
        let product = state.cartItems.filter(item => item.id==data.pid)

        if(data.type==1){
          product[0].count += 1
        }else{
          if(product[0].count>1){
            product[0].count -= 1
          }
        }

        state.cartItems.splice(index, 1, product[0]);

      }

    },

    // order Summary
    GET_SUMMARY:(state, data) => {

        state.summary = []
        var summary = new Object();
        // let total =  state.cartItems.reduce((a,b) => a.price + b.price);
        var subtotal = state.cartItems.reduce(function(prev, cur) {
          return prev + parseFloat(cur.price)*cur.count
        }, 0);

        summary.subtotal = subtotal.toFixed(2)

        var vat = ((subtotal*12)/100) //calculate vat 12%

        var discount = 0;
        if(subtotal>=500){ // calculate discount 2%
          discount = ((subtotal*2)/100)
        }

        summary.vat = vat.toFixed(2)
        summary.discount = discount.toFixed(2)
        summary.total = ((subtotal + vat) - discount).toFixed(2)

        state.summary.unshift(summary)
        console.log(state.summary);


    }

  },
  actions: {

    //fetch data
    fetchData({commit}, payload){

      commit("SET_LOADING", true)

      // setTimeout(() =>{
        fetch("/data.json")
        .then(r => r.json())
        .then(json => {

          commit("SET_LOADING", false)

          commit("FETCH_DATA", json.data)

        })
      // },5000)

    },

    // add item to cart
    addToCart({commit, dispatch}, payload){

      commit("ADD_TO_CART", {pid:payload.pid,count:payload.count})

      dispatch("calculateSummary")
    },

    // get seleted product data
    getProductData({commit}, pid){
      commit("GET_PRODUCT_DATA", pid)
    },

    //change product quantity
    changeCount({commit, dispatch}, payload){
      commit("CHANGE_QTY", payload)
      dispatch("calculateSummary")
    },

    //remove Item from cart
    removeItem({commit, dispatch}, payload){
      commit("REMOVE_ITEM", payload.pid);
      dispatch("calculateSummary")
    },

    // get order Summary
    calculateSummary({commit}){
      commit("GET_SUMMARY")
    }
  },

  plugins: [createPersistedState()]

});
