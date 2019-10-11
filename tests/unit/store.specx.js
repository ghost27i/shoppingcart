import { getters, mutations } from '@/store'

describe('store', () => {
  
  let state
  beforeEach(() => {
    // state = {
    //   loading:false,
    //   catalog:[],
    //   cartItems:[],
    //   seletedProduct:[],
    //   summary:[]
    // }
    store = new Vuex.Store({
      state: {

        loading:false,
        catalog:[],
        cartItems:[],
        seletedProduct:[],
        summary:[]
      },
      mutations: mutations,
      actions: actions
    })
  })
  describe('getters', () => {
    it('getLoadingStatus logic works', () => {
      expect(getters.getLoadingStatus(state)).toBe(false)
      // state.getLoadingStatus = [{}, {}]
      // expect(getters.getLoadingStatus(state)).toBe(true)
    })
    // it('numberOfPosts returns correct count', () => {
    //   expect(getters.numberOfPosts(state)).toBe(0)
    //   state.blogPosts = [{}, {}]
    //   expect(getters.numberOfPosts(state)).toBe(2)
    // })
  })

  // describe('mutations', () => {
  //   it('adds blog posts correctly', () => {
  //     mutations.saveBlogPosts(state, [{ title: 'New post' }])
  //     expect(state.blogPosts).toEqual([{ title: 'New post' }])
  //   })
  // })
})
