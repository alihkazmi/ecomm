import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { removeItemFromCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItemFromCart({ id }));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ListItemText
              primary={item.title}
              secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default Cart;
