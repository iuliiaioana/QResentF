import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TodayIcon from '@mui/icons-material/Today';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { useHistory } from "react-router-dom";

export default function MenuDrawer(props) {

  let history = useHistory();

  const list = () => (
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
        </List>
    </Box>
  );

  return (
    <div>
        <Drawer
          anchor="left"
          open={props.open}
          onClose={props.toggleFunction(false)}
        >
          {list()}
        </Drawer>
    </div>
  );
}