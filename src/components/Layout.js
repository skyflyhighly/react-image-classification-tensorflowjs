import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainApp from './MainApp';


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/GigaNByte">
                {'GigaNByte'}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: "100vh", flexDirection: "column", display: "flex" }}>
                <AppBar position="relative" component="header">
                    <Toolbar>
                        <CameraIcon sx={{ mr: 2 }} />
                        <Typography component="h1" variant="h6" color="inherit" noWrap>
                            Image Classification Demo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 6, flex: "1", display: "flex", flexDirection: "column", justifyContent: "center" }} component="main" >
                    <MainApp />
                </Box>
                <Box sx={{ p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Image Classification Demo
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        This Tensorflow.js demo App uses <a href="https://github.com/tensorflow/tfjs-models/tree/master/mobilenet">MobileNet</a> provided by <a href="https://www.tensorflow.org/" >Tensorflow</a>
                    </Typography>
                    <Copyright />
                </Box>
            </Box >
        </ThemeProvider >
    );
}
