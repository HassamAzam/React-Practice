import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import { Link, Outlet, useNavigate } from "react-router-dom";

import setDocumentTitle from "src/Utilities/title";
import { logout } from "src/sagaStore/sagas/authSagaSlice";
import { sessionRemover } from "src/store/userSlice";
import { useAppDispatch } from "src/store/store";
import { useEffect } from "react";

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(sessionRemover());
    navigate("/login");
  };
  useEffect(() => {
    setDocumentTitle("Dashboard");
  }, []);
  const drawer = (
    <Box>
      <Toolbar />
      <h1>Logo</h1>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="profile">
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="questions">
            <ListItemText primary="Survey" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: "block",
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
