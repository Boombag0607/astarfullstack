import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);

  useEffect(() => {
    if (!product) {
      axios
        .get(`http://localhost:3002/api/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id, product]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ m: 3 }}>
      <Card>
        <CardMedia>
          <img
            src={`https://source.unsplash.com/400x300/?${product.category}`}
            alt={product.name}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body1">Price: {product.price}</Typography>
          <Typography variant="body1">Stock: {product.stock}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
