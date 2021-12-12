import React, { useState, useEffect } from 'react';
import axios from 'axios';

let URL = 'https://randomuser.me/api?results=20';

const getFullData = async () => {
  try {
    let req = await axios.get(URL);
    //console.log(req.data);
    return req.data;
    //console.log(req);
  } catch (error) {
    console.log(error);
  }
};

/*

"location":{
            "street":{
               "number":24,
               "name":"Stanley Road"
            },
            "city":"Bradford",
            "state":"Dorset",
            "country":"United Kingdom",
            "postcode":"G3 0SW",
            "coordinates":{
               "latitude":"15.4690",
               "longitude":"69.1772"
            },
            "timezone":{
               "offset":"-3:30",
               "description":"Newfoundland"
            }
         },


*/

export default function NameFull() {
  const [peopleData, setPeopleData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log('inside Effect');
    getFullData().then((res) => {
      //console.log(res.results);
      setPeopleData(res.results);
      computeValue(res.results);
    });
  }, []);

  const ele = peopleData.map((people) => {
    return <li key={people.cell}> {people.name.first} </li>;
  });

  function getFullStreetName(streetObj) {
    return `${streetObj.number} , ${streetObj.name}`;
  }

  function getFullCoordinate(coordObj) {
    return `${coordObj.latitude} , ${coordObj.longitude}`;
  }

  function computeValue(wholeData) {
    //console.log(wholeData);
    //let headerKeys = Object.keys(wholeData[0].location);

    let table_data = [];
    wholeData.map((w, index) => {
      table_data.push({
        id: index + 1,
        'Street Name': getFullStreetName(w.location.street),
        City: w.location.city,
        State: w.location.state,
        Country: w.location.country,
        Postcode: w.location.postcode,
        Coordinates: getFullCoordinate(w.location.coordinates),
      });
    });

    //console.log(table_data);
    setTableData(table_data);

    let headerKeys = Object.keys(table_data[0]);
    setTableHeader(headerKeys);
  }

  function handleHeaderClick(headerName) {
    console.log(headerName);

    let sortData = [...tableData];

    sortData.sort(function (a, b) {
      var nameA = a[headerName];
      var nameB = b[headerName];
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    console.log(sortData);
    setTableData(sortData);
  }

  return (
    <div>
      <p> Hello New file </p>
      {/* <ul>{ele}</ul> */}
      <table>
        <tr>
          {tableHeader.map((t) => {
            return (
              <th
                onClick={() => {
                  handleHeaderClick(t);
                }}
              >
                {t}
              </th>
            );
          })}
        </tr>

        {tableData.map((row, index) => {
          return (
            <tr>
              {tableHeader.map((header) => {
                return <td>{row[header]}</td>;
              })}
            </tr>
          );
        })}
        {/* {peopleData.map((p, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{p.location.street.name}</td>
              <td>{p.location.city}</td>
              <td>{p.location.state}</td>
              <td>{p.location.country}</td>
              <td>{p.location.postcode}</td>
              <td>
                {p.location.coordinates.longitude}{' '}
                {p.location.coordinates.latitude}
              </td>
              <td>{p.location.timezone.description}</td>
            </tr>
          );
        })} */}
      </table>
    </div>
  );
}
