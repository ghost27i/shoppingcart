import Vuex from 'vuex';
import { shallow, createLocalVue, shallowMount } from '@vue/test-utils'
import Catalog from '@/views/Catalog.vue'
// import {actions, mutations} from '../../src/store/store.js'
import {actions, mutations} from '@/store/store.js'

const localVue = createLocalVue()
localVue.use(Vuex)

// console.log(actions.fetchData);
describe('test actions ', () => {

  let store
  beforeEach(() => {

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

  it('dispatches an getAsync action', () => {
    expect(store.state.catalog).toEqual([])
    // console.log(actions);
    // store.dispatch('store/testAction', { content: 'abc' })
    // expect(actions.testAction).toHaveBeenCalled();
    // console.log("XXX");
  })

  // describe('actions', () => {
  //   test('fetchData', async () => {
  //     expect(store.state.catalog).toEqual([])
  //     await store.dispatch('actions.addToCart', { content: 'abc' })
  //     // expect(store.state.catalog).not.toEqual([])
  //   })
  // })
})


// describe('Catalog.vue', () => {
//
//   let wrapper
//   let store
//
//   let h
//   beforeEach(()=>{
//     store = new Vuex.Store({
//       state:{
//         catalog:[]
//       },
//       getters,
//       actions: {
//         fetchData: jest.fn()
//       }
//     })
//     // wrapper = shallow(Catalog, {localVue, store})
//     // h = new TestHelpers(wrapper, expect)
//   })
//
//   // it('render without error', () => {
//   //   // expect(wrapper.isVueInstance()).toBeTruthy()
//   // })
//   it('calls store action "fetchData" when catalog page render', () => {
//     const wrapper = shallowMount(Catalog, { store, localVue })
//     expect(actions.fetchData).toHaveBeenCalled()
//   })
// })
//
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.isVueInstance()).toBeTruthy()
//   })
// })
