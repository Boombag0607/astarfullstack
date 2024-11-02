import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Modal,
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const checkSessionTimeout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setEditingProduct(null);
    checkSessionTimeout();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    handleClose();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3002/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Open the edit form with selected product data
  const handleEditClick = (product) => setEditingProduct(product);

  // Handle form submit to update the product
  const handleEditSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3002/api/products/${editingProduct.id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
        );
        setEditingProduct(null); // Close the edit form after submission
      }
    } catch (error) {
      setSnackbarOpen(true);
      console.error("Error updating product:", error);
    }
  };

  return (
    <Container>
      <Grid container sx={{ m: 3 }}>
        <Grid size={6}>
          <Typography variant="h4">Edit Products</Typography>
        </Grid>
        <Grid size={6}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button href="/loggedin" startIcon={<HomeIcon />}>
              Back to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.name} size={4}>
            <Card key={product.id} sx={{ margin: 2 }}>
              <CardContent>
                <Typography>{product.name}</Typography>
                <Typography>Category: {product.category}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Stock: {product.stock}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleEditClick(product)}>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={Boolean(editingProduct)}
        onClose={() => setEditingProduct(null)}
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            component="form"
            onSubmit={handleEditSubmit}
            sx={{
              p: 4,
              margin: "auto",
              backgroundColor: "#fff", // Opaque white background
              borderRadius: 2,
            }}
          >
            <TextField
              label="Name"
              value={editingProduct?.name || ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              fullWidth
              sx={{ my: 2 }}
            />
            <TextField
              label="Category"
              value={editingProduct?.category || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              fullWidth
              sx={{ my: 2 }}
            />
            <TextField
              label="Price"
              value={editingProduct?.price || ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              fullWidth
              sx={{ my: 2 }}
            />
            <TextField
              label="Stock"
              value={editingProduct?.stock || ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
              fullWidth
              sx={{ my: 2 }}
            />
            <Button type="submit" fullWidth>
              Edit Product
            </Button>
          </Box>
        </Card>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Your session has timed out! Please log in again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProducts;
