import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading products.</p>;

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      {items.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={product.images[0]}
              alt={product.title}
            />
            <CardContent>
              <Typography
                variant="h6"
                component={Link}
                to={`/products/${product.id}`}
              >
                {product.title}
              </Typography>
              <Typography variant="body2">${product.price}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
