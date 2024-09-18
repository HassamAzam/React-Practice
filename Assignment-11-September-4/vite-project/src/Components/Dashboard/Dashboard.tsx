import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import { Outlet, useNavigate } from "react-router-dom";

import MenuList from "./MenuList";
import { logout } from "src/sagaStore/sagas/authSagaSlice";
import { sessionRemover } from "src/store/userSlice";
import { useAppDispatch } from "src/store/store";
import useDocumentTitle from "src/Hooks/useDocumentTitle";

const drawerWidth = 240;

export default function Dashboard() {
  useDocumentTitle("Dashboard");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(sessionRemover());
    navigate("/login");
  };

  const drawer = (
    <Box>
      <Toolbar />
      <h1>Logo</h1>
      <Divider />
      <MenuList />
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
