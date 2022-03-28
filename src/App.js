import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const changeHandler = (e) => {
    // console.log(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((data) => {
          rowsArray.push(Object.keys(data));
          valuesArray.push(Object.values(data));
        });

        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };
  
  const valuesArray = []
  const uniqueValueArray = []
  if (values.length > 0){
    for(let index=0; index<values.length; index++){
      console.log(values[index][1])
      valuesArray.push(values[index][1])
    }
    console.log(valuesArray);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>CSV Analyzer</h1>
        <form>
          <input
            type="file"
            name="file"
            id="file-input"
            accept=".csv,.xlsx,.xls"
            onChange={changeHandler}
          />
        </form>
        <table>
          <tbody>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>

            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((data, i) => {
                    return <td key={i}>{data}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <PieChart
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" },
          ]}
        /> */}
      </header>
    </div>
  );
}

export default App;
