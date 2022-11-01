import '@scss/main.scss'
import './renderItems';

const dashboard = document.querySelector("#dashboard");

const handleClickItem = (event) => {
  if (event.target.closest('.item') === null)
    return false

  let item = event.target.closest('.item');
  let checkbox = item.querySelector('.item__check');

  if (!event.target.classList.contains('item__check'))
    checkbox.click();

  checkbox.checked ? item.classList.add('item_checked') : item.classList.remove('item_checked');
}

dashboard.addEventListener('click', handleClickItem);

