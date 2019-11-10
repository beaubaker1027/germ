import { getState } from "../store/state";
import listItem from "./components/list-item";
import errorPage from "./components/error-page";
import BackButton from "./components/back-button";

const PlantList = new Reef('#Main', {
  data: {
    state: getState()
  },
  template: function(props){
    let plantList = "";
    const season = props.state.seasons[props.state.selectedSeason] || {}
    if(season.plants){
      season.plants.forEach(function(plant, index){
        plantList += listItem({
          href: `/season/${props.state.selectedSeason}/plant/${index}`,
          position: JSON.stringify({ season: props.state.selectedSeason, plant: index}),
          name: plant.name
        });
      })
    }
    if(!season.name){
      return(`
        <div class="back-button p-10"></div>
        <div id="error" class="l-fl-row l-fl-1 l-txt-c l-aln-c"></div>
      `)
    }
    return(`
      <div class="back-button p-10"></div>
      <div class="navigation-list l-fl-col l-fl-1 p-10">
        <div class="l-fl-row l-aln-c">
          <h1 class="l-fl-1 l-fw-n l-fl-wr l-ft-xl" data-editable=true data-parameter="name"  data-position=${JSON.stringify({ season: props.state.selectedSeason})}>${season.name}</h1>
          <h3 class="p-10 l-fw-b l-ft-xs">PLANTS</h3>
        </div>
        <ul class="l-fl-1">${plantList ? plantList : `<li class="list-button l-ft-l"></li>`}</ul>
        <span class="l-txt-c l-ft-l" data-addition=true data-type="plant" data-position=${JSON.stringify({ season: props.state.selectedSeason })}>+</span>
      </div>
    `)
  }
})

PlantList.attach([BackButton('/'), errorPage]);

export default PlantList;