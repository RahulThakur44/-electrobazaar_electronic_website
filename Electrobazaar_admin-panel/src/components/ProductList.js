import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Typography, CircularProgress, IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://electrobazaar-backend-5.onrender.com/api/products');
       console.log("Products:", res.data.products); 
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async (product) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("description", editingProduct.description);
    formData.append("price", editingProduct.price);
    formData.append("stock", editingProduct.stock);
    formData.append("status", editingProduct.status);
    formData.append("category", editingProduct.category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(
        `https://electrobazaar-backend-5.onrender.com/api/products/${product.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setEditingProduct(null);
      setImage(null);
      fetchProducts();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://electrobazaar-backend-5.onrender.com/api/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Image</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Description</TableCell>
              <TableCell sx={{ color: "#fff" }}>Price</TableCell>
              <TableCell sx={{ color: "#fff" }}>Stock</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Category</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      style={{ objectFit: "contain", borderRadius: 8 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src  = "https://dummyimage.com/60x60/cccccc/000000.png&text=No+Image";

                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <TextField
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        fullWidth size="small"
                      />
                    ) : product.name}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <TextField
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                        fullWidth size="small"
                      />
                    ) : product.description}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <TextField
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, price: e.target.value })
                        }
                        fullWidth size="small"
                      />
                    ) : `₹${product.price}`}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <TextField
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, stock: e.target.value })
                        }
                        fullWidth size="small"
                      />
                    ) : product.stock}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <TextField
                        value={editingProduct.status}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, status: e.target.value })
                        }
                        fullWidth size="small"
                      />
                    ) : product.status}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <TextField
                        value={editingProduct.category}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, category: e.target.value })
                        }
                        fullWidth size="small"
                      />
                    ) : product.category}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <>
                        <input type="file" onChange={handleImageChange} style={{ marginBottom: 8 }} />
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleSave(editingProduct)}
                          disabled={loading || !editingProduct.name || !editingProduct.price}
                        >
                          {loading ? <CircularProgress size={20} /> : "Save"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(product)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(product.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography color="text.secondary">No products found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
