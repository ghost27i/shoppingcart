<template>
  <div class="cart">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h1>Shopping Cart ({{cartItems.length}})</h1>
          <div class="row cart-item" v-if="cartItems.length==0">
            <div class="col-12">
              <p >You don't have any items in your cart</p>
              <div class="button-shop">
                <router-link to="/">Start Shopping</router-link>
              </div>
            </div>
          </div>
          <div class="row cart-item" v-for="product in cartItems" :key="product.id" v-if="cartItems.length>0">
            <div class="col-4">
              <div class="thumbnail">
                  <img class="img-fluid" :src="product.image">
              </div>
            </div>
            <div class="col-4">
              <div class="details">
                  <h2>{{product.name}}</h2>
                  <p>Rs. {{product.price}} </p>
              </div>
            </div>
            <div class="col-4">
              <div class="product-interactions">
                  <div class="button plus" @click="Plus(product.id, product.count)"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
                  <div class="button count">{{product.count}}</div>
                  <div class="button minus" @click="Minus(product.id, product.count)"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>
                  <div class="button delete" @click="remove(product.id)"><i class="fa fa-trash" aria-hidden="true"></i></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <h1>Order Summary</h1>
          <div class="row cart-item">
            <table class="bill">
              <tbody>
                  <tr class="subtotal">
                      <td class="label">
                          Subtotal :
                      </td>
                      <td class="value">
                          Rs. {{getSummary.subtotal}}
                      </td>
                  </tr>
                  <tr class="salestax">
                      <td class="label">
                          VAT (12%) :
                      </td>
                      <td class="value">
                          Rs. {{getSummary.vat}}
                      </td>
                  </tr>
                  <tr>
                      <td class="label">
                          Discount (2%) :
                      </td>
                      <td class="value">
                          Rs. {{getSummary.discount}}
                      </td>
                  </tr>
                  <tr class="total">
                      <td class="label">
                          Total :
                      </td>
                      <td class="value">
                          Rs. {{getSummary.total}}
                      </td>
                  </tr>
              </tbody>
          </table>
          <div class="actions">
          <div class="big-button go">
          Buy
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: "cart",
  computed: {
    ...mapGetters(["cartItems", "getSummary"])
  },
  methods: {
    ...mapActions(["removeItem", "changeCount"]),
    remove(pid){
      this.removeItem({pid:pid})
      // this.$store.dispatch('createEvent', this.event)
    },
    Plus(pid, qty){
      this.changeCount({pid:pid, type:1})
    },
    Minus(pid, qty){
      this.changeCount({pid:pid, type:0})
    },
    // toDetailPage(pid) {
    //   this.$router.push({name:'product',params:{pid:pid}})
    //   // this.getProductData(pid)
    // }
  }
};
</script>
