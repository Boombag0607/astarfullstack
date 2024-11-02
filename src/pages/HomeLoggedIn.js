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
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const HomeLoggedIn = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3002/api/products");
      const { data } = await response;
      setProducts(data);
      setCategories([...new Set(products.map((product) => product.category))]);
      setLoading(false);
    };

    fetchProducts();
  }, [products]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userDetails")) || {};
    setUserDetails(userData);
  }, [userModalOpen]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3002/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product");
    }
  };

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

  const handleUserModalOpen = () => {
    setUserModalOpen(true);
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
              <Modal
                open={userModalOpen}
                onClose={() => setUserModalOpen(false)}
              >
                <Box
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
                  <Typography variant="h6" component="h2">
                    User Details
                  </Typography>
                  <Typography variant="body2" component="p">
                    Name: {userDetails.name || "N/A"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Email: {userDetails.email || "N/A"}
                  </Typography>
                </Box>
              </Modal>

              <IconButton sx={{ width: "55px" }} onClick={handleUserModalOpen}>
                <PersonIcon sx={{ height: "100%" }} />
              </IconButton>

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
                  pick and add products you love
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
                  startIcon={<FileUploadIcon />}
                  href="/add-product"
                  sx={{
                    mr: 2,
                    minHeight: "35px",
                    maxHeight: "45px",
                    fontSize: "0.75rem",
                  }}
                >
                  Upload Product
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  href="/edit-product"
                  sx={{
                    mr: 2,
                    minHeight: "35px",
                    maxHeight: "45px",
                    fontSize: "0.75rem",
                  }}
                >
                  Edit a Product
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
                          <CardActions>
                            <Button onClick={() => handleDelete(product.id)}>
                              <DeleteIcon />
                            </Button>
                          </CardActions>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : products.map((product) => (
                    <Grid size={6}>
                      <Card key={product.id} sx={{ p: 2, mb: 2 }}>
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
                          <CardActions>
                            <Button onClick={() => handleDelete(product.id)}>
                              <DeleteIcon />
                            </Button>
                          </CardActions>
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

export default HomeLoggedIn;
