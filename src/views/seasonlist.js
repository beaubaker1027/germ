import { getState, subscribeToState } from "../store/state";
import listItem from "./components/list-item";

const SeasonList = new Reef('#Main', {
  data: {
    state: getState()
  },
  template: function(props){
    let seasonList = "";
    props.state.seasons.forEach(function(season, index){
      seasonList += listItem({
        href: `/season/${index}`,
        position: JSON.stringify({season: index}),
        name: season.name
      })
    })
    return(`
      <div class="navigation-list l-fl-col l-fl-1 p-10">
        <div>
          <h1 class="l-fw-n l-fl-wr l-ft-xl">Seasons</h1>
        </div>
        <ul class="l-fl-1">${seasonList ? seasonList : "<li class='list-button l-ft-l'></li>"}</ul>
        <span class="l-txt-c l-ft-l" data-addition=true data-type="season" data-position=${JSON.stringify({})}>+</span>
      </div>
    `)
  }
})

export default SeasonList