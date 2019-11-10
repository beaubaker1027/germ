import { getState, subscribeToState } from "../store/state";
import listItem from "./components/list-item";

const DataList = new Reef('#Entry', {
  data: {
    state: getState()
  },
  template: function(props){
    let entriesList = "";
    const season = props.state.seasons[props.state.selectedSeason] || {}
    const plant = season.plants[props.state.selectedPlant] || {}
    const entries = plant.entries || []
    if(entries){
      entries.forEach(function(entry, index){
        if(!entry.name){
          return;
        }
        entriesList += listItem({
          href:`/season/${props.state.selectedSeason}/plant/${props.state.selectedPlant}/entry/${index}`,
          position: JSON.stringify({ season: props.state.selectedSeason, plant: props.state.selectedPlant, entry: index }),
          name: new Date(entry.name).toLocaleDateString('en-US',{
            month: "long",
            day: "2-digit",
            year: "numeric"
          })
        })
      })
    }
    return(`
      <div class="navigation-list l-fl-col l-fl-1">
        <div class="l-fl-row l-aln-c">
          <h1 class="l-fl-1 l-fw-n l-fl-wr l-ft-xl">Entries</h1>
        </div>
        <ul class="l-fl-1">
        ${entriesList ? entriesList : `<li class="list-button l-ft-l"></li>`}
        </ul>
        <span class="l-txt-c l-ft-l" data-addition=true data-type="entry" data-position=${JSON.stringify({ season: props.state.selectedSeason, plant: props.state.selectedPlant })}>+</span>
      </div>
    `)
  }
})

export default DataList