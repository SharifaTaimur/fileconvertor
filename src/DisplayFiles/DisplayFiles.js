import React from "react";
import { useStateValue } from "./../Stateprovider";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CSVLink } from "react-csv";
import DeleteIcon from "@material-ui/icons/Delete";
import "./DisplayFiles.css";
import { Row, Col } from "react-bootstrap";

const DisplayFiles = () => {
  const [{ files }, dispatch] = useStateValue();

  const removeFromFolder = (id) => {
    dispatch({
      type: "REMOVE_FROM_FOLDER",
      id: id,
    });
  };

  console.log("DisplayFiles", files);
  return (
    <div>
      <div className="container">
        <Table striped bordered hover variant="dark" className="text-center">
          <thead>
            <tr>
              <th>File Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <th className="container__filename">{file.filename}</th>
                <th>
                  <Row>
                    <Col>
                      <Button variant="info">
                        <CSVLink
                          //   filename={`${file.filename}.csv`}
                          data={file.files}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Export to CSV
                        </CSVLink>
                      </Button>
                    </Col>
                    <Col>
                      <DeleteIcon
                        className="container__delete"
                        style={{ fontSize: 30 }}
                        onClick={() => removeFromFolder(file.id)}
                      />
                    </Col>
                  </Row>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DisplayFiles;
