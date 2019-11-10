export function exportData(data){
  const date = new Date().toLocaleDateString('en-US',{
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
  }).replace(/\//g, "_")
  const fileName = `germ_${date}.json`

  if(typeof data !== 'string'){
    data = JSON.stringify(data);
  }
  createExport(data, fileName)
}

function createJSONFile(json){
  return("data:text/json;charset=utf-8,"+encodeURIComponent(json))
}

function createExport(data, filename){
  let a = document.createElement('a')
  a.href = createJSONFile(data);
  a.download = filename;
  a.dispatchEvent(new MouseEvent("click",{
    bubbles: false,
    cancelable: true
  }))
}