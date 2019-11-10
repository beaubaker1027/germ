import { models, placeholders } from "../store/defaults";
import { addElement } from "../store/actions";

export function createAddition(el){
  const parent = el.parentNode;
  const type = el.dataset.type;
  const positions = JSON.parse(el.dataset.position);

  const ul = parent.querySelector('ul');
  const child = ul.querySelector('li');
  const style = child.getAttribute('style');
  const classes = child.getAttribute('class');
  const input = document.createElement('input');
  input.placeholder = placeholders[type];
  input.setAttribute('style', style);
  input.setAttribute('autofocus', true);
  input.setAttribute('select', true);
  input.setAttribute('type', 'text');
  input.setAttribute('class', classes);
  input.style.width = child.offsetWidth+'px';

  input.addEventListener('keypress', function(event){
    if(event.keyCode === 13){
      if(input.value){
        return addElement(positions, Object.assign({}, models[type], { name: input.value}));
      }
      return parent.removeChild(input);
    }
  })
  input.addEventListener('focus', function(event){
    event.target.select();
  })
  input.addEventListener('blur', function(event){
    ul.removeChild(input);
  })
  ul.appendChild(input);
}