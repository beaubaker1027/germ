import { setState } from "../store/state";
export function importData(files){
  const file = files[0];
  readFile(file, function(data){
    setState(JSON.parse(data));
  })
}

export function createFileImportDialog(){
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', function(){
    importData(input.files);
  });
  input.click();
}

function readFile(file, cb){
  const reader = new FileReader();
  reader.onload = function(data){
    return cb(this.result);
  }
  reader.readAsText(file);
}