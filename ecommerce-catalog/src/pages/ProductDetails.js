import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/slices/cartSlice";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error)
    return <Alert severity="error">Error loading product details</Alert>;

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardMedia
          component="img"
          height="400"
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary">
            Price: ${product.price}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetails;
