import React, { useState } from "react";
import "./ExcelFileInput.css";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import { useStateValue } from "./../Stateprovider";
import DisplayFiles from "./../DisplayFiles/DisplayFiles";

const ExcelFileInput = () => {
  const [items, setItems] = useState([]);
  const [currentfile, setCurrentfile] = useState([]);
  const [filename, setFilename] = useState();
  const [lastmodified, setLastmodified] = useState("");

  const [{ files }, dispatch] = useStateValue();

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => {
      setItems(data);
    });
    console.log(filename);
    // setCurrentfile(file);
  };

  const Add = () => {
    dispatch({
      type: "ADD_TO_FOLDER",
      item: {
        // files: items,
        currentfile: currentfile,
        lastmodified: lastmodified,
        filename: filename,
      },
    });
    console.log("here");
  };

  const Change = (e) => {
    const file = e.target.files[0];
    readExcel(file);

    console.log(file);
    setCurrentfile(file);
    // setFilename(data.name);
    // setLastmodified(data.lastModifiedDate);
    Add();
  };

  return (
    <div>
      <h1>file input</h1>
      {/* <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      /> */}
      <input type="file" onChange={Change} />

      <CSVLink data={items}>Export to CSV</CSVLink>
      {/* <table className="table container">
        <thead>
          <tr>
            <th scope="col">Arabic</th>
            <th scope="col">English</th>
            <th scope="col">French</th>
            <th scope="col">Russian</th>
            <th scope="col">Spanish</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            // console.log(d)
            <tr>
              <td>{d.Arabic}</td>
              <td>{d.English}</td>
              <td>{d.French}</td>
              <td>{d.Russian}</td>
              <td>{d.Spanish}</td>
              <td>{d.English}</td>
              <td>{d.Description}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <DisplayFiles />
    </div>
  );
};

export default ExcelFileInput;
