import React, { useRef, useState } from "react";
import EditFeed from "./EditFeed";
const Results = (props) => {
  const [editEnabled, setEditEnabled] = useState({ status: false, item: null });
  const editItem = useRef();
  let data = [];
  for (let i in props.data) {
    data.push(props.data[i]);
  }

  const editHandler = (data) => {
    setEditEnabled({ status: true, item: data });
    console.log(editEnabled);
  };
  const updateStatusHandler = (data) => {
    console.log(data);
    setEditEnabled({ status: false, item: null });
    props.updated(true);
  };
  return (
    <div className="col-6 w-50 p-5 overflow-auto">
      <p className="text-center fs-2 text-primary">Results</p>
      <div className="row">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Store ID</th>
              <th scope="col">SKU</th>
              <th scope="col">Price</th>
              <th scope="col">Last Updated</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!data &&
              data.map((index) => {
                console.log(index);
                return (
                  <tr>
                    <th scope="row" ref={editItem}>
                      {index["id"]}
                    </th>
                    <td>{index["product_name"]}</td>
                    <td>{index["store_id"]}</td>
                    <td>{index["sku"]}</td>
                    <td>{index["price"]}</td>
                    <td>{index["date"]}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => editHandler(index)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <hr />
      {editEnabled.status && (
        <EditFeed data={editEnabled.item} updateStatus={updateStatusHandler} />
      )}
    </div>
  );
};

export default Results;
