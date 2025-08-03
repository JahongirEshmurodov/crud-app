import React, { useState } from "react";

function ProductForm(props) {
  const [errorMessage, seterrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // read form data
    const formData = new FormData(event.target);

    // convert formData to object
    const product = Object.fromEntries(formData.entries());

    // form validation
    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price
    ) {
      console.log("Toldirilmagan maydonlar bor");
      seterrorMessage(
        <div class="alert alert-warning" role="alert">
          Toldirilmagan maydonlar bor
        </div>
      );
      return;
    }

    if (props.product.id) {
      // update product
      product.createdAt = new Date().toISOString().slice(0, 10);
      fetch("http://localhost:5174/products/" + props.product.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Serverga ulanishda xatolik yuz berdi");
          }
          return response.json();
        })
        .then((data) => props.showList())
        .catch((error) => {
          console.error("Error", error);
        });
    } else {
      // create new product
      product.createdAt = new Date().toISOString().slice(0, 10);
      fetch("http://localhost:5174/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Serverga ulanishda xatolik yuz berdi");
          }
          return response.json();
        })
        .then((data) => props.showList())
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }

  return (
    <>
      <h2 className="text-center mb-3">
        {props.product.id ? "Edit product" : "Create new product"}
      </h2>
      <div className="row">
        <div className="col-lg-6 mx-auto">
          {errorMessage}
          <form onSubmit={(event) => handleSubmit(event)}>
            {props.product.id && (
              <div className="row mb-3">
                <label htmlFor="" className="col-sm-4 col-form-label">
                  ID
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control-plaintext"
                    name="id"
                    defaultValue={props.product.id}
                  />
                </div>
              </div>
            )}
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Name
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  defaultValue={props.product.name}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Brand
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="brand"
                  defaultValue={props.product.brand}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Category
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="category"
                  defaultValue={props.product.category}
                >
                  <option value="Other">Other</option>
                  <option value="Phones">Phones</option>
                  <option value="Computers">CatComputersegory</option>
                  <option value="Accessories">Accessories</option>
                  <option value="GPS">GPS</option>
                  <option value="Cameras">Cameras</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Price
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="price"
                  defaultValue={props.product.price}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Description
              </label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="description"
                  defaultValue={props.product.description}
                />
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button className="btn btn-primary btn-sm me-3">Save</button>
              </div>
              <div className="col-sm-4 d-grid">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => props.showList()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductForm;
