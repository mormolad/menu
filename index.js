import listMenu from './Api.js';
const menu = document.querySelectorAll('.main-list');

function onClick (e) {
  for(let i = 0; i < e.target.children.length; i++) {
    e.target.children[i].classList.toggle('main-list__item_disable') 
  }
}

//сортируем элементы меню по полю head в меньшую сторону
//сделать массив из node
const key = 'head';
const arrsSortByHead = listMenu.services.reduce(findAverage, []).map(arrItem => {
 return arrItem.sort(function (a, b) {
    if (a.sorthead > b.sorthead) {
      return 1;
    }
    if (a.sorthead < b.sorthead) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
})


console.log(arrsSortByHead)





function findAverage(acc, item, index, arr) {
  const idx = acc.findIndex((e) => e.length > 0 && e[0][key] === item[key]);
  return idx !== -1 ? (acc[idx].push(item), acc) : (acc.push([item]), acc);
}

//const menuItemSortedByHeadDownward = arrsSortByHead.reverse();
//нужна функция которая будет собирать и отрисовывать меню
const menuForRender = arrsSortByHead.reduce(renderMenu,[]);
function renderMenu(acc, arrItem, index, arr) {
  if (arrItem[0].head === null){
    arrItem.forEach(item => {
      const itemMenu = document.createElement('li')
      itemMenu.id = item.id
      itemMenu.className = 'main-list__item'
      itemMenu.innerText = item.name
      if(item.node === 1) {
        console.log(item.name)
        itemMenu.className = 'main-list__item main-list__item_node'
        itemMenu.onclick = onClick
      }     
      menu[0].append(itemMenu)
    });
  } else {
   const elementForPast = document.getElementById(arrItem[0].head)
    arrItem.forEach(item => {
      const itemMenu = document.createElement('li')
      itemMenu.id = item.id
      itemMenu.className = 'main-list__item main-list__item_disable'
      item.node === 0 ? itemMenu.innerText = item.name + ' ' + item.price + ' p.' : itemMenu.innerText = item.name
      elementForPast.append(itemMenu)
    })
  }
}