import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateGraphs from './GenerateGraphs'; // Adjust the path as necessary

export default function InventoryForm() {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div>
            <AppBar position="static" color={darkMode ? "default" : "primary"}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Bio Tea Factory
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/admin/inventory/read-inventory')}>
                        Read Inventory
                    </Button>
                </Toolbar>
            </AppBar>
            <Box className={`flex flex-col items-center mt-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                {/* GenerateGraphs component here */}
                <GenerateGraphs />
            </Box>
        </div>
    );
}
