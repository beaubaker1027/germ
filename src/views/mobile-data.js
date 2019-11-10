import { getState } from "../store/state";
import errorPage from "./components/error-page";
import BackButton from "./components/back-button";

const Journal = new Reef('#Main', {
  data: {
    state: getState()
  },
  template: function(props){
    let seasonList = "";
    const tempPref = props.state.user.temp;
    const season = props.state.seasons[props.state.selectedSeason] || {}
    const plant = season.plants ? season.plants[props.state.selectedPlant] || {} : {}
    const entries = plant.entries ? plant.entries || [] : []
    const entry = entries.length ? entries[props.state.selectedEntry] || {} : {};
    const locationSections = window.location.pathname.split('/')
    const href = locationSections.splice(0, locationSections.length - 2).join('/');
    const position = JSON.stringify({
      season: props.state.selectedSeason,
      plant: props.state.selectedPlant,
    })
    const merge = JSON.stringify({
      param: tempPref,
      value: entry.temperature
    })

    if(!plant.name || !season.name || !(entries.length && !entries.name || !entries.length)){
      return(`
        <div class="back-button p-10"></div>
        <div id="error" class="l-fl-row l-fl-1 l-txt-c l-aln-c"></div>
      `)
    }
    return(`
      <div id="journal" class="l-fl-col l-fl-1">
        ${!entry.name ? `<div class="back-button p-10"></div>` : ""}
        <div id="plant-header" class="l-fl-row l-aln-c l-jc-c p-10">
          ${plant.name ? `<span data-editable=true data-parameter="name" data-position=${position} class="l-low-op l-fl-1 l-ft-xl">${plant.name}</span>` : '<span class="l-fl-1">No Name</span>'}
          <button class="l-ft-xxs" data-editable=true data-clickable=true data-default='${JSON.stringify((new Date()).toLocaleDateString('en-US'))}' data-parameter="harvestDate" data-position=${position}>Harvest</button>
        </div>
        <div class="dates p-10">
          <div class="l-fl-row">
            <span class="l-ft-s" data-editable=true data-type="date">PLANTED:&nbsp;</span>
            <span class="l-ft-s" data-editable=true data-type="date" data-parameter="plantDate" data-position=${position}>
              ${plant.plantDate ?
                (new Date(plant.plantDate)).toLocaleDateString('en-US',{
                  month: "long",
                  day: "2-digit",
                  year: "numeric"
                }):
                "Plant Date?"
              }
            </span>
          </div>
          <div class="l-fl-row">
            <span class="l-ft-s">HARVEST:&nbsp;</span>
            <span class="l-ft-s" data-editable=true data-type="date" data-parameter="harvestDate" data-position=${position}>
              ${plant.harvestDate ?
                (new Date(plant.harvestDate)).toLocaleDateString('en-US',{
                  month: "long",
                  day: "2-digit",
                  year: "numeric"
                  }):
                  "Harvest Date?"
                }
            </span>
          </div>
        </div>
        <div class="data-header p-10 pv-20">
          <h1 class="l-low-op l-ft-xl l-txt-r">Journal</h1>
        </div>
        <div id="Entry" class="p-10 l-fl-1 l-fl-col overflow">
        </div>
      </div>
    `)
  }
})

Journal.attach(errorPage);

export default Journal;