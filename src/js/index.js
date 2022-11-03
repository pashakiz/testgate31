import '@scss/main.scss'
import itemTemplate from './itemTemplate';
import { getData } from './data';

const dashboard = document.querySelector('#dashboard');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchMessage = location.href.split('?search=')[1] ? location.href.split('?search=')[1] : '';

//render
async function renderItems() {
  searchInput.value = searchMessage ? searchMessage : searchInput.value;
  const data = await getData();
  const items = data.filter(row => row.title.toLowerCase().includes(searchInput.value)).map(itemTemplate);
  dashboard.innerHTML = '';
  items.forEach(el => {
    dashboard.innerHTML += el;
  });
  checkItems();
}

document.addEventListener('DOMContentLoaded', renderItems);


//search
const handleClickSearch = (event) => {
  if (event.target.closest('.search__icon') === null)
    return false
  search(searchInput.value);
}

const handleKeySearch = (event) => {
  if (event.code !== 'Enter')
    return false
  search(searchInput.value);
}

const search = (message) => {
  let url = message ? '/?search=' + message.toLowerCase() : '/';
  history.pushState(null, null, url);
  renderItems();
}

searchForm.addEventListener('click', handleClickSearch);
searchForm.addEventListener('keyup', handleKeySearch);

//checkbox
const handleClickItem = (event) => {
  if (event.target.closest('.item') === null)
    return false

  let item = event.target.closest('.item');
  let checkbox = item.querySelector('.item__check');

  if (checkbox.checked) {
    item.classList.add('item_checked');
    sessionStorage.setItem(checkbox.id, true);
    return false
  }

  item.classList.remove('item_checked');
  sessionStorage.removeItem(checkbox.id);
}

const checkItems = () => {
  dashboard.querySelectorAll('.item__check').forEach(el => {
    if (!!sessionStorage.getItem(el.id)) {
      el.checked = true;
      el.closest('.item').classList.add('item_checked');
    }
  });
}

dashboard.addEventListener('click', handleClickItem);
