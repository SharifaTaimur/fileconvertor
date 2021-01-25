import React from "react";
import { useStateValue } from "./../Stateprovider";
import Table from "react-bootstrap/Table";

const DisplayFiles = () => {
  const [
    { files, currentfile, lastmodified, filename },
    dispatch,
  ] = useStateValue();

  console.log("DisplayFiles", currentfile);
  return (
    <div>
      <h1>Files</h1>
      <div className="container">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DisplayFiles;
