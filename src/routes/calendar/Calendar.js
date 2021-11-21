import * as React from 'react';
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer"
// import { CardStack, Card } from 'react-cardstack';

import './Calendar.scss';

export default function Calendar() {

    const dayOfWeek = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
    const date = new Date();

    const materii = ['MPS', 'SPRC', 'MATE1', 'POO', 'hey', 'heyyy'];

    function renderRow(props) {
        const { index, style } = props;

        return (
            <ListItem className="MyList" style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={`${materii[index]}`} />
                </ListItemButton>
            </ListItem>
        );
    }
    const items = [
        { title: 'Mon', description: 'Regular', meta: '6.5 hours'},
        { title: 'Tue', description: 'Regular', meta: '10 hours'},
        { title: 'Wed', description: 'Regular', meta: '1 hours'},
        { title: 'Thu', description: 'Regular', meta: '7 hours'},
    ]

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {dayOfWeek[date.getDay() - 1]}
                </h2>
                <List
                    showsVerticalScrollIndicator={false}
                    height={materii.length*35}
                    className="no-scrollbars"
                    itemCount={materii.length}
                    itemSize={35}
                    width={500}
                >
                    {renderRow}
                </List>
            </div>
        </div>
    );
}