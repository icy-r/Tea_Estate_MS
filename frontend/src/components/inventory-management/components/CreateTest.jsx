import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import TeaGraph from '../components/tea/GraphTea';

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
                  {/* Other graph components */}
                  <Box sx={{ p: 1 }}>
                      <TeaGraph /> {/* Render the TeaGraph here */}
                  </Box>
              </Box>
          </Box>
      </div>
  );
}
