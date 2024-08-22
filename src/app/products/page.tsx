"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  img: string;
  quantity: number;
  price: number;
}

export default function HKT() {
  const [data, setData] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: Math.floor(Math.random() * 1000),
    name: "",
    img: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/products", product);
      alert("Product added successfully!");
      setProduct({
        id: Math.floor(Math.random() * 1000),
        name: "",
        img: "",
        quantity: 0,
        price: 0,
      });
      // Refresh the product list
      const response = await axios.get("http://localhost:3000/api/products");
      setData(response.data.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDelete =  (id: number) => {
    
    try {
       axios.delete(`http://localhost:3000/api/products/id=?${id}`);
      alert("Product deleted successfully");
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 100, marginLeft: 50, marginTop: 50 }}>
      <div>
        <table style={{ border: "3px solid black", width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ border: "3px solid black" }}>
            <tr>
              <th>STT</th>
              <th>IMG</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "3px solid black", textAlign: "center" }}>{item.id}</td>
                <td style={{ border: "3px solid black" }}>
                  <img style={{ width: 200, height: 150 }} src={item.img} alt={item.name} />
                </td>
                <td style={{ border: "3px solid black", textAlign: "center" }}>{item.name}</td>
                <td style={{ border: "3px solid black", textAlign: "center" }}>{item.quantity}</td>
                <td style={{ border: "3px solid black", textAlign: "center" }}>{item.price}</td>
                <td style={{ border: "3px solid black", textAlign: "center" }}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border border-r-2 rounded bg-red-600 text-white"
                    style={{ width: 150, height: 40 }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border border-r-2 rounded bg-blue-600 text-white"
                    style={{ width: 150, height: 40 }}
                  >
                    Change
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleForm}>
        <div style={{ border: "3px solid black", width: 400, padding: "30px" }}>
          <h1 className="text-2xl">Add New Product</h1>
          <br />
          <label>
            <p>Name</p>
            <input
              name="name"
              value={product.name}
              onChange={handleInput}
              style={{ border: "2px solid black", width: "100%", padding: "8px" }}
              type="text"
            />
          </label>
          <label>
            <p>Img URL</p>
            <input
              name="img"
              value={product.img}
              onChange={handleInput}
              style={{ border: "2px solid black", width: "100%", padding: "8px" }}
              type="text"
            />
          </label>
          <label>
            <p>Quantity</p>
            <input
              name="quantity"
              value={product.quantity}
              onChange={handleInput}
              style={{ border: "2px solid black", width: "100%", padding: "8px" }}
              type="number"
            />
          </label>
          <label>
            <p>Price</p>
            <input
              name="price"
              value={product.price}
              onChange={handleInput}
              style={{ border: "2px solid black", width: "100%", padding: "8px" }}
              type="number"
            />
          </label>
          <br /><br />
          <button type="submit" style={{ border: "2px solid black", padding: "10px 20px" }}>Create Product</button>
        </div>
      </form>
    </div>
  );
}
