import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useMediaQuery } from '@mui/material';

export const TabsComponent = ({ days, selectNav, setSelectNav }) => {
    const isSmallScreen = useMediaQuery('(max-width:730px)'); // Detecta pantallas menores a 600px

    const handleChange = (event, newValue) => {
        setSelectNav(days[newValue]);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                maxWidth: '100%',
                bgcolor: 'background.paper',
                display:"flex",
                justifyContent:"center",
                overflowX: isSmallScreen ? "auto" : "hidden",
                whiteSpace: "nowrap",
                '&::-webkit-scrollbar': {
                    height: '6px', 
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                },
            }}
        >
            <Tabs
                value={days.indexOf(selectNav)}
                onChange={handleChange}
                variant={isSmallScreen ? "scrollable" : "standard"}
                scrollButtons
                allowScrollButtonsMobile
                aria-label="days tabs"
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.5 },
                    },
                }}
            >
                {days.map((day, index) => (
                    <Tab
                        key={index}
                        label={day}
                        sx={{
                             paddingY:{xs: "5px" ,sm:"10px" },
                            fontWeight:{xs: "600" ,sm:"700" },
                            mx: "8px",
                            bgcolor: "#E6F7FF",
                            borderRadius: "10px"
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};
