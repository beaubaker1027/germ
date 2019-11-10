import { models } from "./defaults";
export default (function(storage, name, defaultState){

  const getStore = function(){
    var store = localStorage.getItem(name) || JSON.stringify(models.defaultStore);
    try{
      store = JSON.parse(store);
    } catch(err){
      throw new Error('store is not JSON')
    }
    return Object.assign({}, defaultState, store);
  }
  const setStore = function(state){
    state = JSON.stringify(state)
    try{
      localStorage.setItem(name, state);
    } catch(err){
      throw new Error('store was not set')
    }
  }
  const removeStore = function(name){
    try{
      localStorage.removeItem(name)
    } catch(err){
      throw new Error('store was not removed')
    }
    return true
  }
  /*getRefreshedState: function(defaults = {}){
    const storage = this.getState('germ') || {}
    return Object.assign({}, defaultState, defaults, storage)
  }*/
  return({
    getStore,
    setStore,
    removeStore,
  })
})(localStorage, 'germ', {
  seasons: [],
  selectedSeason: undefined,
  selectedPlant: undefined,
  user: models.user,
  error: undefined,
})