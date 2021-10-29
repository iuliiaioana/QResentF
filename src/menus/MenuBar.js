import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuDrawer from './MenuDrawer'
import { useHistory } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PersonIcon from '@mui/icons-material/Person';

export default function MenuBar() {

  const [state, setState] = React.useState({
    openDrawer: false
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ openDrawer: open });
  };

  let history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QResent
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="scan"
            onClick={ () => history.push("/scan") }
          >
            <QrCodeScannerIcon />
          </IconButton>
          <IconButton size="large"
            color="inherit"
            aria-label="scan"
            onClick={ () => history.push("/profile") }>
            <PersonIcon />
          </IconButton>
        </Toolbar>
        <MenuDrawer open={state.openDrawer} toggleFunction={toggleDrawer}></MenuDrawer>
      </AppBar>
    </Box>
  );
}