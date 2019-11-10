!function(t){var e={};function a(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(n,s,function(e){return t[e]}.bind(null,s));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/Users/beaubaker/Documents/Apps/practice/mockwebsites/frontend_practice/webapp/germ/docs",a(a.s=1)}([function(t,e,a){},function(t,e,a){"use strict";a.r(e);const n={season:{name:void 0,plants:[]},plant:{name:void 0,plantDate:new Date,harvestDate:void 0,entries:[]},entry:{name:void 0,temperature:{f:void 0,c:void 0},visibility:void 0,dawn:void 0,dusk:void 0,precipitation:void 0,health:0,water:!1,notes:"Enter Field Notes Here"},user:{temp:"c"},defaultStore:{seasons:[],selectedSeason:void 0,selectedPlant:void 0,selectedEntry:void 0,user:{temp:"c"}}},s={season:"Enter Season Name",plant:"Enter Plant Name",entry:"Enter Entry Date"};var l,o=(localStorage,l={seasons:[],selectedSeason:void 0,selectedPlant:void 0,user:n.user,error:void 0},{getStore:function(){var t=localStorage.getItem("germ")||JSON.stringify(n.defaultStore);try{t=JSON.parse(t)}catch(t){throw new Error("store is not JSON")}return Object.assign({},l,t)},setStore:function(t){t=JSON.stringify(t);try{localStorage.setItem("germ",t)}catch(t){throw new Error("store was not set")}},removeStore:function(t){try{localStorage.removeItem(t)}catch(t){throw new Error("store was not removed")}return!0}});const r=new Reef(null,{data:o.getStore(),lagoon:!0}),i=function(t){if(t)try{return r.data[t]}catch(t){return}return r.data},c=function(t={}){if("object"!=typeof t)throw new Error("Argument must be of type object in function setState");r.setData(Object.assign({},o.getStore(),t)),o.setStore(r.data)};const d=document.body,p=new Reef(d,{data:i(),template:function(t){return'\n      <div id="app" class="l-fl-col l-fl-1">\n      </div>\n      '}});var u,f=(u=p,r.attach(u),u),v=function(t){return`\n      <li class="list-button l-ft-l">\n        <a href=${t.href} target="_self" data-deletion=true data-position=${t.position}>${t.name}</a>\n      </li>\n    `};var m=new Reef("#Main",{data:{state:i()},template:function(t){let e="";return t.state.seasons.forEach((function(t,a){e+=v({href:`/season/${a}`,position:JSON.stringify({season:a}),name:t.name})})),`\n      <div class="navigation-list l-fl-col l-fl-1 p-10">\n        <div>\n          <h1 class="l-fw-n l-fl-wr l-ft-xl">Seasons</h1>\n        </div>\n        <ul class="l-fl-1">${e||"<li class='list-button l-ft-l'></li>"}</ul>\n        <span class="l-txt-c l-ft-l" data-addition=true data-type="season" data-position=${JSON.stringify({})}>+</span>\n      </div>\n    `}});var b=new Reef("#error",{template:'\n      <h1 class="l-fl-1 l-fl-wr l-fw-n p-10">Item Not Found, Please Go Back</h1>\n  '});var h=function(t){return new Reef(".back-button",{template:function(e){return`\n        <a href=${t} target="_self">\n          <div></div>\n        </a>\n        `}})};const y=new Reef("#Main",{data:{state:i()},template:function(t){let e="";const a=t.state.seasons[t.state.selectedSeason]||{};return a.plants&&a.plants.forEach((function(a,n){e+=v({href:`/season/${t.state.selectedSeason}/plant/${n}`,position:JSON.stringify({season:t.state.selectedSeason,plant:n}),name:a.name})})),a.name?`\n      <div class="back-button p-10"></div>\n      <div class="navigation-list l-fl-col l-fl-1 p-10">\n        <div class="l-fl-row l-aln-c">\n          <h1 class="l-fl-1 l-fw-n l-fl-wr l-ft-xl" data-editable=true data-parameter="name"  data-position=${JSON.stringify({season:t.state.selectedSeason})}>${a.name}</h1>\n          <h3 class="p-10 l-fw-b l-ft-xs">PLANTS</h3>\n        </div>\n        <ul class="l-fl-1">${e||'<li class="list-button l-ft-l"></li>'}</ul>\n        <span class="l-txt-c l-ft-l" data-addition=true data-type="plant" data-position=${JSON.stringify({season:t.state.selectedSeason})}>+</span>\n      </div>\n    `:'\n        <div class="back-button p-10"></div>\n        <div id="error" class="l-fl-row l-fl-1 l-txt-c l-aln-c"></div>\n      '}});y.attach([h("/"),b]);var g=y;var w=new Reef("#app",{template:function(t){return'<div id="Main" class="l-w-100 l-fl-col l-fl-1"></div><div id="Header" class="p-10 l-w-100 l-fl-row"></div>'}});var S=new Reef("#Header",{template:'\n    <div class="l-fl-row l-fl-1 l-aln-c pad5">\n      <h1 class="l-fl-1 l-low-op l-fw-n l-ft-xxl">Germ</h1>\n      <button class="l-low-op l-ft-xs" data-import="true">▲</button>\n      \n  <div class="l-fl-col">\n    <a href="https://github.com/beaubaker1027" class="ex-link l-low-op">Github</a>\n    <a href="https://twitter.com/beauthehumanboy" class="ex-link l-low-op">Twitter</a>\n  </div>\n\n    </div>\n  '});var N=new Reef("#Entry",{data:{state:i()},template:function(t){let e="";const a=((t.state.seasons[t.state.selectedSeason]||{}).plants[t.state.selectedPlant]||{}).entries||[];return a&&a.forEach((function(a,n){a.name&&(e+=v({href:`/season/${t.state.selectedSeason}/plant/${t.state.selectedPlant}/entry/${n}`,position:JSON.stringify({season:t.state.selectedSeason,plant:t.state.selectedPlant,entry:n}),name:new Date(a.name).toLocaleDateString("en-US",{month:"long",day:"2-digit",year:"numeric"})}))})),`\n      <div class="navigation-list l-fl-col l-fl-1">\n        <div class="l-fl-row l-aln-c">\n          <h1 class="l-fl-1 l-fw-n l-fl-wr l-ft-xl">Entries</h1>\n        </div>\n        <ul class="l-fl-1">\n        ${e||'<li class="list-button l-ft-l"></li>'}\n        </ul>\n        <span class="l-txt-c l-ft-l" data-addition=true data-type="entry" data-position=${JSON.stringify({season:t.state.selectedSeason,plant:t.state.selectedPlant})}>+</span>\n      </div>\n    `}});const $=new Reef("#Main",{data:{state:i()},template:function(t){const e=t.state.user.temp,a=t.state.seasons[t.state.selectedSeason]||{},n=a.plants&&a.plants[t.state.selectedPlant]||{},s=n.entries&&n.entries||[],l=s.length&&s[t.state.selectedEntry]||{},o=window.location.pathname.split("/"),r=(o.splice(0,o.length-2).join("/"),JSON.stringify({season:t.state.selectedSeason,plant:t.state.selectedPlant}));JSON.stringify({param:e,value:l.temperature});return n.name&&a.name&&(s.length&&!s.name||!s.length)?`\n      <div id="journal" class="l-fl-col l-fl-1">\n        ${l.name?"":'<div class="back-button p-10"></div>'}\n        <div id="plant-header" class="l-fl-row l-aln-c l-jc-c p-10">\n          ${n.name?`<span data-editable=true data-parameter="name" data-position=${r} class="l-low-op l-fl-1 l-ft-xl">${n.name}</span>`:'<span class="l-fl-1">No Name</span>'}\n          <button class="l-ft-xxs" data-editable=true data-clickable=true data-default='${JSON.stringify((new Date).toLocaleDateString("en-US"))}' data-parameter="harvestDate" data-position=${r}>Harvest</button>\n        </div>\n        <div class="dates p-10">\n          <div class="l-fl-row">\n            <span class="l-ft-s" data-editable=true data-type="date">PLANTED:&nbsp;</span>\n            <span class="l-ft-s" data-editable=true data-type="date" data-parameter="plantDate" data-position=${r}>\n              ${n.plantDate?new Date(n.plantDate).toLocaleDateString("en-US",{month:"long",day:"2-digit",year:"numeric"}):"Plant Date?"}\n            </span>\n          </div>\n          <div class="l-fl-row">\n            <span class="l-ft-s">HARVEST:&nbsp;</span>\n            <span class="l-ft-s" data-editable=true data-type="date" data-parameter="harvestDate" data-position=${r}>\n              ${n.harvestDate?new Date(n.harvestDate).toLocaleDateString("en-US",{month:"long",day:"2-digit",year:"numeric"}):"Harvest Date?"}\n            </span>\n          </div>\n        </div>\n        <div class="data-header p-10 pv-20">\n          <h1 class="l-low-op l-ft-xl l-txt-r">Journal</h1>\n        </div>\n        <div id="Entry" class="p-10 l-fl-1 l-fl-col overflow">\n        </div>\n      </div>\n    `:'\n        <div class="back-button p-10"></div>\n        <div id="error" class="l-fl-row l-fl-1 l-txt-c l-aln-c"></div>\n      '}});$.attach(b);var x=$;var O=new Reef("#Entry",{data:{state:i()},template:function(t){const e=t.state.user.temp,a=t.state.seasons[t.state.selectedSeason]||{},n=a.plants&&a.plants[t.state.selectedPlant]||{},s=n.entries&&n.entries||[],l=s.length&&s[t.state.selectedEntry]||{},o=window.location.pathname.split("/"),r=(o.splice(0,o.length-2).join("/"),JSON.stringify({season:t.state.selectedSeason,plant:t.state.selectedPlant,entry:t.state.selectedEntry})),i=JSON.stringify({param:e,value:l.temperature});return`\n      <div class="back-button"></div>\n      <div class="title l-ft-s" data-editable=true data-type="date" data-parameter="name" data-position=${r}>${l.name?l.name:"Entry is not named"}</div>\n      <div id="dailies" class="l-fl-row l-jc-sb">\n        <ul class="l-fl-1 l-fl-row l-jc-sa l-fl-wr">\n          <li class="l-fl-row l-aln-c"><span class="l-ft-xxs">TEMP •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="number" data-parameter="temperature" data-merge=${i} data-position=${r}>${l.temperature[e]||0===l.temperature[e]?l.temperature[e]+"°"+e:"No data"}</span></li>\n          <li class="l-fl-row l-aln-c"><span class="l-ft-xxs">VIS  •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="number" data-parameter="visibility" data-position=${r}>${l.visibility||0===l.visibility?l.visibility:"No Data"}</span></li>\n          <li class="l-fl-row l-aln-c"><span class="l-ft-xxs">DAWN •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="time" data-parameter="dawn" data-position=${r}>${l.dawn?l.dawn:"No data"}</span></li>\n        </ul>\n        <ul class="l-fl-col l-jc-sb">\n          <li class="l-fl-1 l-fl-row l-aln-c"><span class="l-ft-xxs">PREC •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="number" data-parameter="precipitation" data-position=${r}>${l.precipitation||0===l.precipitation?l.precipitation:"No data"}</span></li>\n          <li class="l-fl-1 l-fl-row l-aln-c"><span class="l-ft-xxs">DUSK  •&nbsp;</span><span class="l-ft-xxs l-fl-1" data-editable=true data-type="time" data-parameter="dusk" data-position=${r}>${l.dusk?l.dusk:"No Data"}</span></li>\n        </ul>\n      </div>\n      <div class="pv-20 clickables l-jc-c l-aln-c">\n        <div class="l-fl-1 l-fl-row l-jc-sa l-aln-c">\n          <span data-clickable=true data-editable=true data-value="1" data-default=-1 data-parameter="health" data-position=${r} class="p-10 ${l.health<0?"active":"l-low-op"}">\n            -\n          </span>\n          <span class="p-10 ${l.health>=0?"active":"l-low-op"}">\n            Health\n          </span>\n          <span data-editable=true data-clickable=true data-default=1 data-parameter="health" data-position=${r} class="p-10 ${l.health>=0?"active":"l-low-op"}">\n            +\n          </span>\n        </div>\n        <span data-editable=true data-clickable=true data-type="bool" data-parameter="water" data-position=${r} data-default=${JSON.stringify(!!l.water)} class="p-10 l-fl-1 l-jc-c l-aln-c l-fl-row ${l.water?"active":"l-low-op"}">Water</span>\n      </div>\n      <span class="l-fl-1 l-ft-xs textarea" data-editable=true data-el="textarea" data-parameter="notes" data-position=${r}>${l.notes?l.notes:"Enter Field Notes Here"}</span>\n    `}});function E(t){const e=t.dataTransfer.files[0];if("application/json"===t.dataTransfer.items[0].type){t.preventDefault(),t.stopPropagation();const a=new FileReader;a.onload=function(t){console.log(this.result),c(JSON.parse(this.result))},a.readAsText(e)}}function D(t){const e=`germ_${(new Date).toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"2-digit"}).replace(/\//g,"_")}.json`;"string"!=typeof t&&(t=JSON.stringify(t)),function(t,e){console.log(e),console.log(t);let a=document.createElement("a");a.href=(n=t,"data:text/json;charset=utf-8,"+encodeURIComponent(n)),a.download=e,a.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}));var n}(t,e)}function j(t=[],e=[],a=[]){return[].concat(t,e,a)}function J(t={},e={}){return Object.assign({},t,e)}function k(t,e){return[t.slice(0,e),t.slice(e+1)]}function P(t,e){const a=i();let n,s,l;void 0!==t.season&&(n=a.seasons[t.season]||{}),void 0!==t.plant&&(s=n.plants[t.plant]||{}),void 0!==t.entry&&(l=s.entries[t.entry]||{});let o=e;if(l){const e=J(l,o),a=k(s.entries,t.entry);o={entries:j(a[0],e,a[1])}}if(s){const e=J(s,o),a=k(n.plants,t.plant);o={plants:j(a[0],e,a[1])}}if(n){const e=J(n,o),s=k(a.seasons,t.season);o={seasons:j(s[0],e,s[1])}}c(J(a,o))}function A(t){t.parentNode,t.parentNode.childNodes;const e=t.innerText,a=t.getAttribute("style"),n=t.getAttribute("class"),s=document.createElement(t.dataset.el?t.dataset.el:"input");s.defaultValue=e,s.setAttribute("style",a),s.setAttribute("autofocus",!0),s.setAttribute("select",!0),s.setAttribute("type","text"),s.setAttribute("class",n),s.style.width=event.target.offsetWidth+"px",s.addEventListener("keypress",(function(e){if(13===e.keyCode){const e=t.dataset.merge&&JSON.parse(t.dataset.merge),a=JSON.parse(t.dataset.position),n=t.dataset.parameter;if("date"===t.dataset.type){const t=new Date(s.value);isNaN(t.getTime())?s.value="":s.value=t.toLocaleDateString("en-US",{month:"long",day:"2-digit",year:"numeric"})}if("time"===t.dataset.type){const t=function(t){if(!t.includes(":"))return;const e=new Date,[a,n]=t.split(":");return e.setHours(a,n),e}(s.value);isNaN(t.getTime())?s.value="":s.value=t.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit"})}if("number"===t.dataset.type&&isNaN(s.value)&&(s.value=""),s.value)return P(a,{[n]:e?Object.assign({},e.value,{[e.param]:s.value}):s.value});s.parentNode.replaceChild(t,s)}})),s.addEventListener("focus",(function(t){t.target.select()})),s.addEventListener("blur",(function(e){s.parentNode.replaceChild(t,s)})),t.parentNode.replaceChild(s,t)}function L(t){return t.dataset.clickable?function(t){const e=t.dataset.merge&&JSON.parse(t.dataset.merge),a=JSON.parse(t.dataset.position),n=t.dataset.parameter;if(t.dataset.default)return"bool"===t.dataset.type?P(a,{[n]:e?Object.assign({},e.value,{[e.param]:!JSON.parse(t.dataset.default)}):!JSON.parse(t.dataset.default)}):void 0!==typeof t.dataset.default?P(a,{[n]:e?Object.assign({},e.value,{[e.param]:JSON.parse(t.dataset.default)}):JSON.parse(t.dataset.default)}):void 0}(t):A(t)}function M(t){const e=t.dataset.parameter,a=t.dataset.default;return function(t,e){const a=i();Object.assign({},a,e)}(0,{[e]:JSON.parse(a)})}function R(t){const e=t.parentNode,a=t.dataset.type,l=JSON.parse(t.dataset.position),o=e.querySelector("ul"),r=o.querySelector("li"),d=r.getAttribute("style"),p=r.getAttribute("class"),u=document.createElement("input");u.placeholder=s[a],u.setAttribute("style",d),u.setAttribute("autofocus",!0),u.setAttribute("select",!0),u.setAttribute("type","text"),u.setAttribute("class",p),u.style.width=r.offsetWidth+"px",u.addEventListener("keypress",(function(t){if(13===t.keyCode)return u.value?function(t,e){const a=i();let n,s;void 0!==t.season&&(n=a.seasons[t.season]||{}),void 0!==t.plant&&(s=n.plants[t.plant]||{});const l=Object.assign({},a,n?{seasons:[].concat(a.seasons.slice(0,t.season),s?Object.assign({},n,{plants:[].concat(n.plants.slice(0,t.plant),{...s,entries:[].concat(s.entries,e||[])},n.plants.slice(t.plant+1))}):{...n,plants:[].concat(n.plants,e)},a.seasons.slice(t.season+1))}:{seasons:[].concat(a.seasons,e||[])});c(l)}(l,Object.assign({},n[a],{name:u.value})):e.removeChild(u)})),u.addEventListener("focus",(function(t){t.target.select()})),u.addEventListener("blur",(function(t){o.removeChild(u)})),o.appendChild(u)}function T(t){!function(t){const e=i();let a,n,s;if(void 0!==t.season)try{a=e.seasons[t.season]||{}}catch(t){throw new Error("Something went wrong gathering season from store")}if(void 0!==t.plant)try{n=a.plants[t.plant]||{}}catch(t){throw new Error("Something went wrong gathering plants from season")}if(void 0!==t.entry)try{s=n.entries[t.entry]||{}}catch(t){throw new Error("something went wrong gathering entries from plants")}const l=Object.assign({},e,a?{seasons:[].concat(e.seasons.slice(0,t.season),n?Object.assign({},a,{plants:[].concat(a.plants.slice(0,t.plant),s?Object.assign({},n,{entries:[].concat(n.entries.slice(0,t.entry),[],n.entries.slice(t.entry+1))}):[],a.plants.slice(t.plant+1))}):[],e.seasons.slice(t.season+1))}:void 0);c(l)}(JSON.parse(t.dataset.position))}a(0);w.attach([S]),Meowter.meow("/",(function(){w.detach(g),w.detach(x),c({selectedSeason:void 0,selectedPlant:void 0,selectedEntry:void 0}),w.attach(m),w.render()})),Meowter.meow("/season/(=◕ᆽ◕ฺ=)",(function(t){w.detach(m),w.detach(x),c({selectedSeason:t,selectedPlant:void 0,selectedEntry:void 0}),w.attach(g),w.render()})),Meowter.meow("/season/(=◕ᆽ◕ฺ=)/plant/(=◕ᆽ◕ฺ=)",(function(t=0,e=0){w.detach(m),w.detach(g),x.detach(O),c({selectedSeason:Number.parseInt(t),selectedPlant:Number.parseInt(e),selectedEntry:void 0});const{selectedPlant:a,selectedSeason:n}=i();x.attach([h(`/season/${n}`),N]),w.attach(x),w.render()})),Meowter.meow("/season/(=◕ᆽ◕ฺ=)/plant/(=◕ᆽ◕ฺ=)/entry/(=◕ᆽ◕ฺ=)",(function(t=0,e=0,a=0){c({selectedSeason:Number.parseInt(t),selectedPlant:Number.parseInt(e),selectedEntry:Number.parseInt(a)});const{selectedPlant:n,selectedSeason:s,selectedEntry:l}=i();x.attach(O),x.attach([h(`/season/${s}/plant/${n}`)]),x.detach(N),w.attach(x),w.render()})),f.attach([w]),f.render(),Meowter.preventMeow((function(t){return t.target.dataset.deletion&&t.shiftKey})),document.addEventListener("click",(function(t){const e=t.target;if(e.dataset.import){console.log("import");const{seasons:t,user:e}=i();D({seasons:t,user:e}||{})}e.dataset.deletion&&t.shiftKey&&(T(e),t.preventDefault(),t.stopPropagation()),e.dataset.user&&M(e),e.dataset.editable&&L(e),e.dataset.addition&&R(e)}),!1),document.addEventListener("drop",E),document.addEventListener("keypress",(function(t){if("BODY"===t.target.nodeName&&t.metaKey&&"e"===t.key){const{seasons:t,user:e}=i();return D({seasons:t,user:e}||{})}}))}]);