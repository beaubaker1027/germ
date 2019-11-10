export default function(item){
    return(`
      <li class="list-button l-ft-l">
        <a href=${item.href} target="_self" data-deletion=true data-position=${item.position}>${item.name}</a>
      </li>
    `)
}