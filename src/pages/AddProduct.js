import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted product:", product);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3002/api/products",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      
      // Show the snackbar and reset the form after success
      setOpenSnackbar(true);
      setProduct({ name: "", category: "", price: "", stock: "" });
    } catch (error) {
      console.error("Error adding product");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container sx={{ m: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h4">Add Products</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button href="/loggedin" startIcon={<HomeIcon />}>
              Back to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box component="form" onSubmit={handleSubmit} sx={{ m: 1 }}>
        <TextField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save Product
          </Button>
        </Box>
      </Box>

      {/* Snackbar for notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProduct;
