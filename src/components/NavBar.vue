<template>
  <div class="header">
    <router-link to="/">Catalog</router-link> |
    <router-link to="/cart">Shopping Cart <i class="fa fa-shopping-cart" aria-hidden="true"></i><small class="qty">{{getItemCount}}</small></router-link>

  </div>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters(["getItemCount"])
  },
}
</script>
