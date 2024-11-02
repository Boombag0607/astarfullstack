import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Typography,
  Box,
  Grid2 as Grid,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  ListItemButton,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";

const HomeLoggedOut = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([
    "electronics",
    "fashion",
    "beauty",
    "home",
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3002/api/products");
      console.log(response);
      const { data } = await response;
      console.log(data);
      setProducts(data);
      setCategories([...new Set(products.map((product) => product.category))]);
      setLoading(false);
    };

    fetchProducts();
  }, [products]);

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Grid container sx={{ width: "100%", minHeight: "100vh" }}>
        <Grid
          size={{ lg: 3, md: 4, xs: 0 }}
          sx={{
            height: "100%",
            bgcolor: "#111",
            color: grey[50],
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              height: "15%",
              p: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/*Logo*/}
            <img src="logo.png" alt="logo" height="100%" />
          </Box>
          <List sx={{ width: "100%", maxWidth: 360, px: 8 }}>
            {categories.map((cat) => (
              <ListItemButton
                key={cat}
                component={Link}
                to={`/category/${cat}`}
              >
                <ListItem key={cat} button>
                  <ListItemText primary={cat} />
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid size={{ lg: 9, md: 8, xs: 12 }} sx={{ ml: 0, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <TextField
                placeholder="Search"
                size="small"
                variant="filled"
                fullWidth
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    color: "#111",
                    borderRadius: "5px",
                    paddingRight: "8px",
                    "&:hover": {
                      backgroundColor: "#ddd",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#eee",
                      borderColor: "#777",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#111" }} />{" "}
                      {/* Light color icon */}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                px: 1,
              }}
            >
              <IconButton sx={{ width: "55px" }} onClick={() => {}}>
                <HelpOutlineIcon sx={{ height: "100%" }} />
              </IconButton>
            </Box>
          </Box>
          <Grid container sx={{ mt: 2 }}>
            <Grid size={{ lg: 6, md: 6, sm: 12 }} sx={{ my: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ py: 1 }}>
                  Product Library
                </Typography>
                <Typography variant="body1">
                  login to add and edit products
                </Typography>
              </Box>
            </Grid>
            <Grid
              size={{ lg: 6, md: 6, sm: 12 }}
              sx={{ justifyContent: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "flex-end",
                  gap: 2,
                  p: 1,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  href="/login"
                  sx={{
                    mr: 2,
                    minHeight: "35px",
                    maxHeight: "45px",
                    fontSize: "0.75rem",
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={4}>
              {filteredProducts.length
                ? filteredProducts.map((product) => (
                    <Grid size={6}>
                      <Card key={product.id} sx={{ p: 2, mb: 2 }}>
                        {console.log("product ::::: ", product)}
                        <CardActionArea
                          component={Link}
                          to={{
                            pathname: `/products/${product.id}`,
                            state: { product },
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" component="div">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {product.category}
                              {product.stock > 0
                                ? " - In Stock"
                                : " - Out of Stock"}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : products.map((product) => (
                    <Grid size={6}>
                      <Card key={product.id} sx={{ p: 2, mb: 2 }}>
                        {console.log("product ::::: ", product)}
                        <CardActionArea
                          component={Link}
                          to={{
                            pathname: `/products/${product.id}`,
                            state: { product },
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" component="div">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {product.category}
                              {product.stock > 0
                                ? " - In Stock"
                                : " - Out of Stock"}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeLoggedOut;
