import React, { useRef, useState } from "react";
import { CSVLink } from "react-csv";

const FileUpload = (props) => {
  const csv = useRef();
  const [csvFile, setCSVFile] = useState();
  const data = "Store ID,SKU,Product Name,Price";
  const csvDownloadHandler = () => {
    csv.current.link.click();
  };
  const fileChangeHandler = (event) => {
    setCSVFile(event.target.files[0]);
  };
  const fileUploadHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", csvFile);
    console.log(csvFile);

    fetch("http://localhost:8000/api/upload/", {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div className="row ">
        <div className="col-6 fs-3 p-5 text-center">
          <p>
            You can feed pricing data in this portal but you need to make sure
            that the file is in the same template as we require. To get more
            details, please download the <strong>Sample file</strong> below.
          </p>
          <button
            onClick={csvDownloadHandler}
            className="btn btn-primary btn-lg fs-4"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-down-circle-fill me-2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
              </svg>
              Download sample file
            </span>
          </button>
          <CSVLink
            data={data}
            filename="sample.csv"
            className="hidden"
            ref={csv}
            target="_blank"
          />
        </div>
        <div className="col-6 fs-3 p-5 ">
          <form onSubmit={fileUploadHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputfile" className="form-label">
                Upload File
              </label>

              <input
                type="file"
                className="form-control"
                id="exampleInputFile"
                aria-describedby="fileHelp"
                onChange={fileChangeHandler}
              />
              <div id="emailHelp" className="form-text">
                <em className="fs-5">
                  Note:Please upload file in<strong> correct format.</strong>
                </em>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
