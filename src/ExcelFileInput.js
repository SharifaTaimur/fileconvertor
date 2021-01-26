import React, { useState } from "react";
import { useStateValue } from "./Stateprovider";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import DisplayFiles from "./DisplayFiles/DisplayFiles";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { v4 as uuid } from "uuid";
import { Container, Row, Col } from "react-bootstrap";

const Test = () => {
  const [items, setItems] = useState([]);
  const [{ files }, dispatch] = useStateValue();
  // const [currentfile, setCurrentfile] = useState([]);
  // const [filename, setFilename] = useState();
  // const [lastmodified, setLastmodified] = useState("");

  // NEW
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const readExcel = (file) => {
    const id = uuid();
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        setProgress(parseInt(Math.round((e.loaded * 100) / e.total)));
        // Clear Percentage
        setTimeout(() => setProgress(0), 2000);

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
      Add(file, data, id);
    });
  };

  //Dispatch to datalayer
  const Add = (e, data, id) => {
    dispatch({
      type: "ADD_TO_FOLDER",
      item: {
        id: id,
        files: data,
        currentfile: e,
        lastmodified: e.lastModifiedDate,
        filename: e.name,
      },
    });
  };

  return (
    <>
      <Container>
        <Card
          style={{
            width: "58rem",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          bg="dark"
        >
          <Card.Header style={{ color: "white" }}>Upload Files</Card.Header>
          <Card.Body style={{ background: "white" }}>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.File
                      id="custom-file-translate-scss"
                      label="Custom file input"
                      lang="en"
                      custom
                      onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file);
                      }}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped bg-success"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <hr />
        <Row>
          <Col>{files.length > 0 ? <DisplayFiles /> : null}</Col>
        </Row>

        {/* <div className="row">
        <div className=" col-12 text-center">
          {files.length > 0 ? <DisplayFiles /> : null}
        </div>
      </div> */}
      </Container>
    </>
  );
};

export default Test;
