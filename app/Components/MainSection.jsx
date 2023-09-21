"use client";
import React, { useState, useEffect } from "react";

const MainSection = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({});

  useEffect(() => {
    //   Fetch all products
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("/api/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          console.log("Error fetching products");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchAllProducts();
    console.log(products)
  }, []);

  //   Add a Product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });
      if (response.ok) {
        console.log("Product Added Successfully");
      } else {
        console.log("Error Creating Product");
      }
    } catch (error) {
      console.log("Error", error);
    }
    setProductForm({});
  };

  //   Hnadlechange for Add Product Form
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Stock Management */}
      {/* Dropdown for selecting a product */}
      <div className='container my-2 py-3 mx-auto bg-blue-100 text-xl text-center border-b-2 border-gray-500 mb-4'>
        <h2>Search for a Product</h2>
        <div className='flex items-center'>
          <select className='px-2 py-1 border border-gray-300 rounded-l'>
            <option value=''>Select Product</option>
            {/* {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))} */}
          </select>
          <input
            type='text'
            placeholder='Search by name...'
            className='px-2 py-1 border border-gray-300 rounded-r'
          />
          <button
            type='button'
            className='bg-blue-500 text-white px-4 py-1 rounded-r'
            onClick={""}>
            Search
          </button>
        </div>
      </div>

      {/* Add a product */}

      <div className='container my-2 py-3 mx-auto bg-blue-100 text-xl text-center border-b-2 border-gray-500 mb-4'>
        <h2>Add a Product</h2>

        <form onSubmit={addProduct}>
          <label htmlFor='productName'>Product Slug:</label>
          <input
            onChange={handleChange}
            type='text'
            id='productName'
            name='slug'
            required
          />

          <label htmlFor='quantity'>Quantity:</label>
          <input
            onChange={handleChange}
            type='number'
            id='quantity'
            name='quantity'
            required
          />

          <label htmlFor='price'>Price:</label>
          <input
            onChange={handleChange}
            type='number'
            id='price'
            name='price'
            required
          />

          <button onClick={addProduct} type='submit'>
            Add Product
          </button>
        </form>
      </div>

      {/* Display Current Stock */}
      <div className='container my-2 py-3 mx-auto bg-blue-100 text-xl text-center border-b-2 border-gray-500 mb-4'>
        <h2>Current Stock</h2>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Product Name</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.slug}>
                  <td className='border px-4 py-2'>{product.slug}</td>
                  <td className='border px-4 py-2'>{product.quantity}</td>
                  <td className='border px-4 py-2'>${product.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='border px-4 py-2' colSpan='3'>
                  No Products to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainSection;
