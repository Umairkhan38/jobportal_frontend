import { Box } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";

const Footer = () => {
    const { palette } = useTheme();
    return (
        <>
            <Box sx={{
                height: '120px',
                bgcolor: palette.secondary.midNightBlue,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Container maxWidth="sm">
                <Box component='h2' sx={{ color: 'white',textAlign:'center' }}>Jobster.com</Box>
        <Typography variant="body2" color="white" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://www.Jobster.com/">
            Jobster.com
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
            </Box>
        </>
    )
}

export default Footer
