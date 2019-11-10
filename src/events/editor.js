import { updateElement, updateUserProperty } from "../store/actions";

function parseTime(time){
  if(!time.includes(":")){
    return;
  }
  const date = new Date();
  const [ hours, minutes ] = time.split(":");
  date.setHours(hours, minutes);
  return date;
}

function createInput(el){
  const parent = el.parentNode;
  const childNodes = el.parentNode.childNodes
  const text = el.innerText;
  const style = el.getAttribute('style');
  const classes = el.getAttribute('class');
  const input = document.createElement(el.dataset.el ? el.dataset.el : 'input');
  input.defaultValue = text;
  input.setAttribute('style', style);
  input.setAttribute('autofocus', true);
  input.setAttribute('select', true);
  input.setAttribute('type', 'text');
  input.setAttribute('class', classes);
  input.style.width = event.target.offsetWidth+'px';

  input.addEventListener('keypress', function(event){
    //check for enter keypress
    if(event.keyCode === 13){
      const merge = el.dataset.merge && JSON.parse(el.dataset.merge);
      const positions = JSON.parse(el.dataset.position);
      const parameter = el.dataset.parameter;

      //check for date data type
      if(el.dataset.type === "date"){
        const date = new Date(input.value);
        if(isNaN(date.getTime())){
          input.value = "";
        } else {

          input.value = date.toLocaleDateString('en-US',{
            month: "long",
            day: "2-digit",
            year: "numeric"
          });
        }
      }

      if(el.dataset.type === "time"){
        const time = parseTime(input.value);
        if(isNaN(time.getTime())){
          input.value = "";
        } else {
          input.value = time.toLocaleTimeString('en-US',{
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      }

      //check for number data type
      if(el.dataset.type === "number"){
        if(isNaN(input.value)){
          input.value = "";
        }
      }

      //check for value
      if(input.value){
        return updateElement(positions, { [parameter]: merge ? Object.assign({}, merge.value, { [merge.param]: input.value}) : input.value })
      }
      //if input is not valid replace with
      input.parentNode.replaceChild(el, input);
    }
  })
  input.addEventListener('focus', function(event){
    event.target.select();
  })
  input.addEventListener('blur', function(event){
    input.parentNode.replaceChild(el, input)
  })

  el.parentNode.replaceChild(input, el);
}

function clickUpdate(el){

  const merge = el.dataset.merge && JSON.parse(el.dataset.merge);
  const positions = JSON.parse(el.dataset.position);
  const parameter = el.dataset.parameter;

  if(!el.dataset.default){
    return;
  }
  if(el.dataset.type === "bool"){
    //check for data value to be defined;
      return updateElement(positions, { [parameter]: merge ? Object.assign({}, merge.value, { [merge.param]: !JSON.parse(el.dataset.default)}) : !JSON.parse(el.dataset.default) })
  } else {
    if(typeof el.dataset.default !== undefined){
      return updateElement(positions, { [parameter]: merge ? Object.assign({}, merge.value, { [merge.param]: JSON.parse(el.dataset.default)}) : JSON.parse(el.dataset.default) })
    }
  }
}

export function createEditor(el){


  if(el.dataset.clickable){
    return clickUpdate(el)
  } else {
    return createInput(el)
  }
}

export function updateUser(el){
  const parameter = el.dataset.parameter;
  const value = el.dataset.default;
  return updateUserProperty({}, { [parameter] : JSON.parse(value) })
}