import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { items, status, error } = useSelector((state) => state.products);

  if (status === "loading") return <Typography>Loading...</Typography>;
  if (status === "failed") return <Typography>Error: {error}</Typography>;
  console.log("ALLLL", items);
  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        Welcome to the Product Catalog
      </Typography>
      <Grid container spacing={4}>
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.images}
                alt={product.title}
                sx={{ objectFit: "cover" }} // Ensure the image covers the area
              />
              <CardContent>
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${product.price}
                </Typography>
                <Button
                  component={Link}
                  to={`/products/${product.id}`}
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
