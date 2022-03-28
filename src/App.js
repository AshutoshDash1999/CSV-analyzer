import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const colors = ["#2A2135", "#6A2135", "#C13C37", "#E38627"];

  const changeHandler = (e) => {
    // console.log(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // console.log(results.data);
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

  let valuesArray = [];
  let uniqueValueArray = [];
  let uniqueValueCount = {};
  let pieData = [];
  if (values.length > 0) {
    for (let index = 0; index < values.length; index++) {
      // console.log(values[index][1]);
      valuesArray.push(values[index][1]);
    }
    // console.log(valuesArray);
    uniqueValueArray = [...new Set(valuesArray)];
    // console.log(uniqueValueArray);
    
    for (let index = 0; index < valuesArray.length; index++) {
      uniqueValueCount[valuesArray[index]] = 1 + (uniqueValueCount[valuesArray[index]] || 0);
    }

    // let uniqueValueObject = Object.keys(uniqueValueCount).length;

    Object.keys(uniqueValueCount).map((key) => {
        console.log(uniqueValueCount[key]);
    })

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
        <div style={{height:"100vh"}}>
          {/* <PieChart
            data={[
              { title: "App", value: 2, color: "#E38627" },
              { title: "ML", value: 3, color: "#C13C37" },
              { title: "Web", value: 4, color: "#6A2135" },
              { title: "iOS", value: 1, color: "#2A2135" },
            ]}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{fontSize: '5px', fontColor:"white"}}
          /> */}
        </div>
      </header>
    </div>
  );
}

export default App;
