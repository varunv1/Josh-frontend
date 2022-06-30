import React, { useRef, useState } from "react";

const EditFeed = (props) => {
  const [storeId, setStoreID] = useState(props.data.store_id);
  const [pname, setPName] = useState(props.data.product_name);
  const [sku, setSKU] = useState(props.data.sku);
  const [price, setPrice] = useState(props.data.price);
  const [lastModified, setLastModified] = useState(props.data.date);

  const storeChangeHandler = (event) => {
    setStoreID(event.target.value);
    console.log(event.target.value);
  };
  const pnameChangeHandler = (event) => {
    setPName(event.target.value);
    console.log(event.target.value);
  };
  const skuChangeHandler = (event) => {
    setSKU(event.target.value);
    console.log(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
    console.log(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let url = `http://localhost:8000/api/feeds/${props.data.id}/`;
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        store_id: storeId,
        sku: sku,
        product_name: pname,
        price: price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert(res.statusText);
        }
      })
      .then((data) => props.updateStatus("Updated Successfully"));
  };
  return (
    <form onSubmit={submitHandler}>
      <p className="text-primary text-center fs-3">Update data</p>
      <div className="row">
        <div className="col-6 mb-2">
          <div className="mb-3">
            <label htmlFor="exampleInputStore" className="form-label">
              Store ID
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputStore"
              value={storeId}
              onChange={storeChangeHandler}
            />
          </div>
        </div>
        <div className="col-6 mb-2">
          <div className="mb-3">
            <label htmlFor="exampleInputsku" className="form-label">
              SKU
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputsku"
              value={sku}
              onChange={skuChangeHandler}
            />
          </div>
        </div>
        <div className="col-6 mb-2">
          <label htmlFor="exampleInputName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            value={pname}
            onChange={pnameChangeHandler}
          />
        </div>

        <div className="col-6 mb-2">
          <label htmlFor="exampleInputLastUpdated" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputLastUpdated"
            value={price}
            min="0"
            step="0.1"
            onChange={priceChangeHandler}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3 p-2 fs-4">
        Update
      </button>
    </form>
  );
};

export default EditFeed;
