export default function(item){
    return(`
      <li class="list-button l-ft-l l-fl-row">
        <a href=${item.href} class="l-fl-1" target="_self" data-deletion=true data-position=${item.position}>${item.name}</a>
        <button class="l-ft-l" data-deletion=true data-position=${item.position}>X</button>
      </li>
    `)
}