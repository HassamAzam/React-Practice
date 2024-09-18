import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const menuItems = [
  { text: "Profile", to: "profile" },
  { text: "Survey", to: "questions" },
];

const MenuList = () => {
  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton component={Link} to={item.to}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
