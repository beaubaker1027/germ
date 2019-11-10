import { subscribeToState, getState } from "../store/state"

const ROOT = document.body

const app = new Reef(ROOT, {
  data: getState(),
  template:function(props){
    return(`
      <div id="app" class="l-fl-col l-fl-1">
      </div>
      `)
    }
})

export default subscribeToState(app)