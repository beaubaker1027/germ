import { setState } from "../store/state";
export function importData(event){
  const file = event.dataTransfer.files[0];
  const mimetype = event.dataTransfer.items[0].type
  if(mimetype === 'application/json'){
    event.preventDefault();
    event.stopPropagation();
    const reader = new FileReader();
    reader.onload = function(data){
      console.log(this.result);
      setState(JSON.parse(this.result));
    }
    reader.readAsText(file);
  }
}