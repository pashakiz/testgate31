import itemTemplate from './itemTemplate';
import { getData } from './data';

const dashboard = document.querySelector("#dashboard");

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getData();
  const items = data.map(itemTemplate);
  items.forEach(el => {
    dashboard.innerHTML += el;
  });
});
