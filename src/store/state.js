import Store from "./store";

const sourceOfTruth = new Reef(null, {
  data: Store.getStore(),
  lagoon: true
})

export const subscribeToState = function(element){
  sourceOfTruth.attach(element);
  return element
}

export const getState = function(key){
  if(key){
    try{
      return sourceOfTruth.data[key]
    } catch(err){
      return undefined
    }
  }
  return sourceOfTruth.data
}

export const setState = function(state = {}){
  if(typeof state !== 'object'){
    throw new Error('Argument must be of type object in function setState')
  }
  sourceOfTruth.setData(Object.assign({}, Store.getStore(), state))
  Store.setStore(sourceOfTruth.data);
}

export const clearState = function(){
  sourceOfTruth.setDate({});
  Store.removeStore()
}

export default sourceOfTruth