import App from "./views/composition";
import SeasonList from "./views/seasonlist";
import PlantList from "./views/plantlist";
import MobileTemplate from "./views/MobileTemplate";
import Title from "./views/title";
import DataList from "./views/data-list";
import Journal from "./views/mobile-data";
import BackButton from "./views/components/back-button";
import Entry from "./views/components/entry";
import { subscribeToState, getState, setState, clearState } from "./store/state";
import { importData } from "./events/import.js";
import { exportData } from "./events/export.js";
import { createEditor, updateUser } from "./events/editor";
import { createAddition } from "./events/addition";
import { createDeletion } from "./events/delete";

import './styles/styles.scss';
//sets up layout of application and renders main component
function loadStandardUI(){
  //connect elements to roots
  MobileTemplate.attach([Title]);

  Meowter.meow('/', function(){
    MobileTemplate.detach(PlantList)
    MobileTemplate.detach(Journal);
    setState({
      selectedSeason: undefined,
      selectedPlant: undefined,
      selectedEntry: undefined
    })
    MobileTemplate.attach(SeasonList);
    MobileTemplate.render();
  })

  Meowter.meow('/season/(=◕ᆽ◕ฺ=)', function(seasonIndex){
    MobileTemplate.detach(SeasonList)
    MobileTemplate.detach(Journal);
    setState({
      selectedSeason: seasonIndex,
      selectedPlant: undefined,
      selectedEntry: undefined
    })
    MobileTemplate.attach(PlantList);
    MobileTemplate.render();
  })

  Meowter.meow('/season/(=◕ᆽ◕ฺ=)/plant/(=◕ᆽ◕ฺ=)', function(seasonIndex = 0, plantIndex = 0){
    MobileTemplate.detach(SeasonList)
    MobileTemplate.detach(PlantList);
    Journal.detach(Entry);
    setState({
      selectedSeason: Number.parseInt(seasonIndex),
      selectedPlant: Number.parseInt(plantIndex),
      selectedEntry: undefined
    })
    const { selectedPlant, selectedSeason } = getState();
    Journal.attach([BackButton(`/season/${selectedSeason}`), DataList])
    MobileTemplate.attach(Journal);
    MobileTemplate.render();
  })

  Meowter.meow('/season/(=◕ᆽ◕ฺ=)/plant/(=◕ᆽ◕ฺ=)/entry/(=◕ᆽ◕ฺ=)', function(seasonIndex = 0, plantIndex = 0, entryIndex = 0){
    setState({
      selectedSeason: Number.parseInt(seasonIndex),
      selectedPlant: Number.parseInt(plantIndex),
      selectedEntry: Number.parseInt(entryIndex)
    })
    const { selectedPlant, selectedSeason, selectedEntry } = getState();
    Journal.attach(Entry);
    Journal.attach([BackButton(`/season/${selectedSeason}/plant/${selectedPlant}`)])
    Journal.detach(DataList);
    MobileTemplate.attach(Journal);
    MobileTemplate.render();
  })
}


function buildUI(){
  App.attach([MobileTemplate]);
  App.render();
}
function setup(composition, state){
  loadStandardUI()
  buildUI();
  Meowter.preventMeow(function(event){
    return event.target.dataset.deletion  && event.shiftKey;
  })
  document.addEventListener('click', function(event){
    const el = event.target;
    if(el.dataset.import){
      const { seasons, user } = getState();
      exportData({ seasons, user } || {});
    }
    if(el.dataset.deletion){
      if(event.shiftKey || event.target.nodeName === "BUTTON"){
        createDeletion(el);
        event.preventDefault();
        event.stopPropagation();
      }
    }

    if(el.dataset.user){
      updateUser(el);
    }
    if(el.dataset.editable){
      createEditor(el);
    }
    if(el.dataset.addition){
      createAddition(el);
    }
  }, false)
  document.addEventListener('drop', importData)
  document.addEventListener('keypress', function(event){
    if(event.target.nodeName === "BODY" && event.metaKey){
      if(event.key === 'e'){
        const { seasons, user } = getState();
        return exportData({ seasons, user } || {});
      }
    }
  })
}

//document.addEventListener('keypress', createKeyPressHandler({getState, setState, clearState}, document), false)
//document.addEventListener('submit', createSubmitHandler({getState, setState, clearState}), false)
//document.addEventListener('click', createClickHandler({getState, setState, clearState}), false)
/*document.addEventListener('contextmenu', function(event){
  if(event.shiftKey){
    event.preventDefault();
    event.stopPropagation();
  }
  const el = event.target;
  if(el.dataset.clickable && el.dataset.editable){
    createEditor(el);
  }
}, false)*/

setup();