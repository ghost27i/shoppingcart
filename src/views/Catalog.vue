<template>
  <div class="catalog">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="container">
      <div class="empty" v-if="!getLoadingStatus && allCatalog.length==0">
          No Data !
      </div>

      <div class="loading" v-if="getLoadingStatus">
        Loading Please Wait..
      </div>

      <div class="row cart" v-if="allCatalog.length>0">
        <div class="col-3 product" v-for="product in allCatalog" :key="product.id" >
          <div class="product-preview" @click="toDetailPage(product.id)">
              <div class="thumbnail">
                  <img class="img-fluid" :src="product.image">
              </div>
              <div class="product-paper">
                  <div class="product-name">
                      {{product.name}}
                  </div>
                  <div class="product-price">
                      Rs. {{product.price}}
                  </div>
              </div>
          </div>
          <!-- <div class="product-quantity">
              x1
          </div> -->
          <div class="product-interactions">
              <!-- <div class="button plus" @click="Plus(product.id)"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
              <div class="button minus" @click="Minus(product.id)"><i class="fa fa-minus-circle" aria-hidden="true"></i></div> -->
              <div class="button" @click="add(product.id)"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i></div>
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: "catalog",
  computed: {
    ...mapGetters(["getLoadingStatus", "allCatalog"])
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    ...mapActions(["addToCart", "fetchData"]),
    add(pid){
      this.addToCart({pid:pid,count:1})
    },
    toDetailPage(pid) {
      this.$router.push({name:'product',params:{pid:pid}})
    }
  }
};
</script>
