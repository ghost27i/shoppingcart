<template>
  <div class="single-product">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="product-image">
            <img class="img-fluid" :src="productDetails.image">
            <p>Rs. {{productDetails.price}}</p>
            <div class="product-interactions">
                <div class="button plus" @click="Plus(productDetails.id)"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
                <div class="button count">{{qty}}</div>
                <div class="button minus" @click="Minus(productDetails.id)"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>
                <div class="button cart" @click="add(productDetails.id)"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i></div>
            </div>
          </div>
        </div>
        <div class="col-8 detail">
          <h1>{{productDetails.name}}</h1>
          <p>{{productDetails.detail}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: "product",
  data(){
    return{
      qty:1
    }
  },
  computed: {
    ...mapGetters(["productDetails"])
  },
  beforeCreate() {
    this.$store.dispatch("getProductData",this.$route.params.pid)
    // this.getProductData(this.$route.params.pid)
  },
  methods: {
    ...mapActions(["addToCart"]),
    Plus(pid){
      this.qty+=1
    },
    Minus(pid){
      if(this.qty>1){
        this.qty-=1
      }
    },
    add(pid){
      this.addToCart({pid:pid,count:this.qty})
    },
  }
};
</script>
