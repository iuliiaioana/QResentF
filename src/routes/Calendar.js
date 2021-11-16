import * as React from 'react';
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import { FixedSizeList } from 'react-window';
import { List } from '@bit/mylong.core-ui-ts.list';
import { ThemeProvider, mainTheme } from '@bit/mylong.core-ui-ts.themes'

export default function Calendar() {

    const dayOfWeek = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
    const date = new Date();

    const materii = ['MPS', 'SPRC', 'MATE1', 'POO'];

    function renderRow(props) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
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
                {/*<Box*/}
                {/*    sx={{ width: '100%', height: 800, maxWidth: 360, bgcolor: 'background.paper' }}*/}
                {/*>*/}
                {/*    <FixedSizeList*/}
                {/*        height={400}*/}
                {/*        width={360}*/}
                {/*        itemSize={46}*/}
                {/*        itemCount={materii.length}*/}
                {/*    >*/}
                {/*        {renderRow}*/}
                {/*    </FixedSizeList>*/}
                {/*</Box>*/}
                <ThemeProvider theme={mainTheme}>
                    <List
                        header={{
                            title: 'Shifts',
                            description: '(03/15/2020 - 04/01/2020)',
                            onClick: console.log,
                        }}
                        items={items}
                        onRowClick={console.log}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
}