import React, { useRef, useState } from "react";
import Results from "./Results";

const Search = (props) => {
  // const [updated, setUpdated] = useState(false);
  const [queryResults, setQueryResults] = useState(null);
  const store_id = useRef();
  const pname = useRef();
  const sku = useRef();
  const last_up = useRef();

  const queryHandler = (event) => {
    event.preventDefault();

    let queryData = {
      store_id: store_id.current.value ? store_id.current.value : null,
      product_name: pname.current.value ? pname.current.value : null,
      sku: sku.current.value ? sku.current.value : null,
      date: last_up.current.value ? last_up.current.value : null,
    };
    console.log(queryData);
    const queryURL = "http://localhost:8000/api/search/";
    setQueryResults(null);
    fetch(queryURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert(res.statusText);
        }
      })
      .then((data) => setQueryResults(JSON.parse(data)));
  };
  const updateStatusHandler = (data) => {
    // setUpdated(true);
    setQueryResults(null);
  };
  return (
    <div>
      <div className="row">
        <div className="col-6 container p-5 w-50">
          <p className="text-center fs-2 text-primary">Query database</p>
          <form>
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
                    ref={store_id}
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
                    ref={sku}
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
                  ref={pname}
                />
              </div>

              <div className="col-6 mb-2">
                <label htmlFor="exampleInputLastUpdated" className="form-label">
                  Last Updated
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleInputLastUpdated"
                  ref={last_up}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3 p-2 fs-4"
              onClick={queryHandler}
            >
              Fetch Records
            </button>
          </form>
          <hr />
        </div>
        {/* only show when we have data */}
        {!!queryResults && (
          <Results data={queryResults} updated={updateStatusHandler} />
        )}
      </div>
    </div>
  );
};

export default Search;
