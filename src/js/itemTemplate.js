const itemTemplate = (
  {
    userId = '',
    id = '',
    title = '',
    body = ''
  }
) => (`
<div class="item" data-id="${id}" data-user-id="${userId}">
  <div class="item__title">${title}</div>
  <div class="item__body">${body}</div>
  <input class="item__check" type="checkbox" name="${id}" id="ch-${userId}-${id}">
</div>
`);

export default itemTemplate;
