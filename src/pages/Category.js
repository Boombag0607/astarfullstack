//create the category component

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid2 as Grid,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const previousPath = location.state?.from;

  const handleGoBack = () => {
    if (previousPath === "/loggedin") {
      navigate("/loggedin");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`http://localhost:3002/api/products/`);
      console.log(response);
      const { data } = await response;
      console.log(data);
      setProducts(data.filter((product) => product.category === category));
    };

    fetchProducts();
  }, [category]);
  return (
    <Container>
      <Grid container sx={{ m: 3 }}>
        <Grid size={6}>
          <Typography variant="h4" gutterBottom>
            {category}
          </Typography>
        </Grid>
        <Grid size={6}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleGoBack} startIcon={<HomeIcon />}>
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mx: 3 }}>
        {products.map((product) => (
          <Grid key={product.id} size={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://source.unsplash.com/400x300/?${product.category}`}
                alt={product.name}
              />
              <CardContent>
                <Box sx={{ p: 2, mb: 2 }}>
                  <Typography>{product.name}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Category;
