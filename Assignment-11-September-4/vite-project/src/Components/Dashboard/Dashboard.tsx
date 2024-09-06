import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SurveyComponent from "./SurveyComponent";
import logout from "../Login/Logout";
import DetailsForm from "./DetailsForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sessionRemover } from "../../store/userSlice";

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [selectedComponent, setSelectedComponent] =
    React.useState<React.ReactNode>(<DetailsForm />);

  const handleComponentChange = (component: React.ReactNode) => {
    setSelectedComponent(component);
  };
  const handleLogout = () => {
    logout();
    dispatch(sessionRemover())
    navigate('/login')
  }

  const drawer = (
    <div>
      <Toolbar />
      <h1>Logo</h1>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleComponentChange(<DetailsForm />)}>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleComponentChange(<SurveyComponent />)}>
            <ListItemText primary="Survey" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
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
          <Button
            color="inherit"
            onClick={() =>handleLogout() }
          >
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
        {selectedComponent}
      </Box>
    </Box>
  );
}
