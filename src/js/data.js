const DELAY = 70;
const URL = 'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7';

let allData;

export const getData = () => {
  withDelay(DELAY)
    .then(fetchData)
    //.then(prepareData)
    .then((data) => {
      allData = data;
    });

    return new Promise((res) => {
      if (allData) res(allData);

      const interval = setInterval(async () => {
        if (allData) {
          res(allData);
          clearInterval(interval);
        }
      }, 100);
    });
}

const withDelay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const fetchData = () => (
  fetch(URL)
    .then(res => res.json())
    .then(data => data)
);

const prepareData = (obj) => (
  Object.entries(obj)
    .reduce((res, [type, data]) => {
      res[type] = normalizeData(type, data);
      return res;
    }, {})
);
