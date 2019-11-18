import { getState } from "../../store/state";

const Journal = new Reef('#Entry', {
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
      entry: props.state.selectedEntry,
    })
    const merge = JSON.stringify({
      param: tempPref,
      value: entry.temperature
    })
    return(`
      <div class="back-button"></div>
      <div class="title l-ft-s" data-editable=true data-type="date" data-parameter="name" data-position=${position}>${entry.name ? entry.name : "Entry is not named"}</div>
      <div id="dailies" class="l-fl-row l-jc-sb">
        <ul class="l-fl-1 l-fl-row l-jc-sa l-fl-wr">
          <li class="l-fl-row l-aln-c"><span class="l-ft-xxs">TEMP •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="number" data-parameter="temperature" data-merge=${merge} data-position=${position}>${entry.temperature[tempPref] || entry.temperature[tempPref] === 0 ? entry.temperature[tempPref]+"°"+tempPref: 'No data'}</span></li>
          <li class="l-fl-row l-aln-c"><span class="l-ft-xxs">VIS  •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="number" data-parameter="visibility" data-position=${position}>${entry.visibility || entry.visibility === 0 ? entry.visibility : 'No Data'}</span></li>
          <li class="l-fl-row l-aln-c"><span class="l-ft-xxs">DAWN •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="time" data-parameter="dawn" data-position=${position}>${entry.dawn ? entry.dawn: 'No data'}</span></li>
        </ul>
        <ul class="l-fl-col l-jc-sb">
          <li class="l-fl-1 l-fl-row l-aln-c"><span class="l-ft-xxs">PREC •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="number" data-parameter="precipitation" data-position=${position}>${entry.precipitation || entry.precipitation === 0 ? entry.precipitation: 'No data'}</span></li>
          <li class="l-fl-1 l-fl-row l-aln-c"><span class="l-ft-xxs">DUSK  •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="time" data-parameter="dusk" data-position=${position}>${entry.dusk ? entry.dusk : 'No Data'}</span></li>
        </ul>
      </div>
      <div class="pv-20 clickables l-jc-c l-aln-c">
        <div class="l-fl-1 l-fl-row l-jc-sa l-aln-c">
          <span data-clickable=true data-editable=true data-value="1" data-default=${-1} data-parameter="health" data-position=${position} class="p-10 l-ft-xl ${entry.health < 0 ? "active":"l-low-op"}">
            -
          </span>
          <span class="p-10 ${entry.health >= 0 ? "active":"l-low-op"}">
            Health
          </span>
          <span data-editable=true data-clickable=true data-default=${1} data-parameter="health" data-position=${position} class="p-10 l-ft-s ${entry.health >= 0 ? "active":"l-low-op"}">
            +
          </span>
        </div>
        <span data-editable=true data-clickable=true data-type="bool" data-parameter="water" data-position=${position} data-default=${JSON.stringify(!!entry.water)} class="p-10 l-fl-1 l-jc-c l-aln-c l-fl-row ${entry.water ? "active" : "l-low-op"}">Water</span>
      </div>
      <span class="l-fl-1 l-ft-xs textarea" data-editable=true data-el="textarea" data-parameter="notes" data-position=${position}>${entry.notes ? entry.notes : "Enter Field Notes Here"}</span>
    `)
  }
})

export default Journal