import React, { useState, useEffect } from 'react';
import axios from 'axios';

let url = 'https://jsonplaceholder.typicode.com/posts';

async function getWholeData(pageNumber = 1) {
  console.log(` starting api time : ${new Date().getTime()}`);
  let newUrl = `https://randomuser.me/api?page=${pageNumber}`;
  try {
    const d = await axios.get(newUrl);
    console.log(d);
    return d.data;
  } catch (error) {
    console.log(error);
  }
}

export default function GetData() {
  const [wholeData, setWholeData] = useState('');
  const [dataArray, setDataArray] = useState([]);

  const [pagenumber, setPageNumber] = useState(1);

  useEffect(() => {
    console.log('Hello effect');
    getWholeData(pagenumber).then(function (r) {
      console.log(` end api time : ${new Date().getTime()}`);
      console.log(JSON.stringify(r));

      setWholeData(JSON.stringify(r));
      setDataArray([...dataArray, ...r.results]);
    });
  }, [pagenumber]);

  const handleLoadMore = function () {
    setPageNumber(pagenumber + 1);
  };

  console.log('hello outside');

  const m = dataArray.map(function (q, index) {
    return (
      <li key={index}>
        {q.gender} {q.phone}
      </li>
    );
  });

  const getFullName = (name) => {
    return `${name.title} ${name.first} ${name.last}`;
  };

  return (
    <div>
      <p> Hello world </p>
      <button onClick={handleLoadMore}> Load more </button>
      <ul>
        {dataArray.map((w) => {
          return (
            <li key={w.id.value}>
              <img src={w.picture.medium} /> {getFullName(w.name)} {w.gender}{' '}
              {w.phone}{' '}
            </li>
          );
        })}
      </ul>

      {/* <ul>{wholeData}</ul> */}
      {/* <ul>{m}</ul> */}
    </div>
  );
}
