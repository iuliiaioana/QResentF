import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TodayIcon from '@mui/icons-material/Today';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LogoutIcon from '@mui/icons-material/Logout';

import { useHistory } from "react-router-dom";

export default function MenuDrawer(props) {

  let history = useHistory();

  const studentList = () => (
    <Box
      sx="250"
      role="presentation"
      onClick={props.toggleFunction(false)}
      onKeyDown={props.toggleFunction(false)}
    >
      <List>
        <ListItem button onClick={ () => history.push("/subjects") }>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItem>

        <ListItem button onClick={ () => history.push("/calendar") }>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>

        <ListItem button onClick={ () => history.push("/attendance-list") }>
          <ListItemIcon>
              <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance List" />
        </ListItem>

        <ListItem button onClick={ () => history.push("/statistics") }>
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
      </List>

      <Divider />
      
      <List>
        <ListItem button onClick={ () => history.push("/profile") }>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
          
        <ListItem button onClick={ () => history.push("/scan") }>
          <ListItemIcon>
            <QrCodeScannerIcon />
          </ListItemIcon>
          <ListItemText primary="Scan a code" />
        </ListItem>
    
        <ListItem button onClick={ () => logout(history) }>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Box>
  );

  const switchList = () => {
    switch (localStorage.getItem('account_type')) {
      case 'student':
        return studentList();
      default:
        // return notLoggedInList();
        return studentList();
    }
  }

  return (
    <div>
        <Drawer
          anchor="left"
          open={props.open}
          onClose={props.toggleFunction(false)}
        >
          {studentList()}
        </Drawer>
    </div>
  );
}

function logout(history) {
  localStorage.removeItem("token");
  localStorage.setItem("status", "notLogged");
  history.push("/login");
}