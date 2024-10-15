import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import TeaGraph from '../components/tea/GraphTea';
import GraphFert from '../components/fertilizer/GraphFert';
import GraphFuel from '../components/fuel/GraphFuel'; 
import GraphUtilities from '../components/utilities/GraphUtilities'; // Import the GraphUtilities component

export default function InventoryHome() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div>
            <Box
                className={`flex flex-col items-center mt-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
                sx={{
                    flexGrow: 1,
                    p: 2,
                    height: 'calc(100vh - 64px)',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    BIO TEA FACTORY
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, width: '100%' }}>
                    <Box sx={{ p: 1 }}>
                        <TeaGraph />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <GraphFert />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <GraphFuel /> 
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <GraphUtilities /> {/* Render the GraphUtilities here */}
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
