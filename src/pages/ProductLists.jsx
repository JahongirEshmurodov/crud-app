import React, { useEffect, useState } from "react";

function ProductLists(props) {
  const [products, setproducts] = useState([]);

  function fetchProducts() {
    fetch("//localhost:5174/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        setproducts(data);
      })
      .catch((error) => console.error("Error:", error));
  }
  // fetchProducts()
  useEffect(() => fetchProducts(), []);
  function deleteProduct(id) {
    fetch("http://localhost:5174/products/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("O`chirishda xatolik yuz berdi");
        }
        return response.json();
      })
      .then(() => fetchProducts())
      .catch((error) => console.log("Error", error));
  }
  return (
    <>
      <h2 className="text-center mb-3">Products Page</h2>
      <button
        type="button"
        className="btn btn-primary me-2"
        onClick={() => props.showForm({})}
      >
        Create
      </button>
      <button
        type="button"
        className="btn btn-outline-primary me-2"
        onClick={() => fetchProducts()}
      >
        Refresh
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created AT</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}$</td>
                <td>{product.createdAt}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <button
                    onClick={() => props.showForm(product)}
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ProductLists;
