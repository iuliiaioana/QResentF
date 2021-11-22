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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useHistory } from "react-router-dom";

export default function MenuDrawer(props) {

  let history = useHistory();
  let token = JSON.parse(localStorage['token']);

  const studentList = () => (
    <Box
      sx="250"
      role="presentation"
      onClick={props.toggleFunction(false)}
      onKeyDown={props.toggleFunction(false)}
    >
      <List>
        <ListItem button onClick={() => history.push("/subjects")}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItem>

        <ListItem button onClick={() => history.push("/calendar")}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>

        <ListItem button onClick={() => history.push("/attendance-list")}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance List" />
        </ListItem>

        <ListItem button onClick={() => history.push("/statistics")}>
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button onClick={() => history.push("/profile")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        {token.user_rol == 'admin' ?
          <ListItem button onClick={() => history.push("/admin")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Administrator page" />
          </ListItem>
          : ''}

        <ListItem button onClick={() => history.push("/qr")}>
          <ListItemIcon>
            <QrCodeScannerIcon />
          </ListItemIcon>
          <ListItemText primary="Scan a code" />
        </ListItem>

        <ListItem button onClick={() => logout(history)}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Box>
  );

  const professorList = () => (
    <Box
        sx="250"
        role="presentation"
        onClick={props.toggleFunction(false)}
        onKeyDown={props.toggleFunction(false)}
    >
      <List>
        <ListItem button onClick={ () => history.push("/attendance-list") }>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance List" />
        </ListItem>
      </List>

      <Divider />

      {studentList()}
    </Box>
  );

  const switchList = () => {
    const user_token = JSON.parse(localStorage.getItem("token"));
    if (user_token != null) {
      switch (user_token['user_rol']) {
        case 'student':
          return studentList(); break;
        case 'profesor':
          return professorList(); break;
        default:
          // return notLoggedInList();
          return studentList(); break;
      }
    } else {
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
          {switchList()}
        </Drawer>
    </div>
  );
}

function logout(history) {
  localStorage.removeItem("token");
  localStorage.setItem("status", "notLogged");
  history.push("/login");
}