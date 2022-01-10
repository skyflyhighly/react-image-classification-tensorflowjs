import { Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'

export default function AppTitles() {
    return (
        <Paper elevation={0} sx={{ transition: "opacity 500ms ease-in-out" }}>
            <Typography
                component="h2"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Image Classification Demo App
            </Typography>
            <Typography component="h3" variant="h5" align="center" color="text.secondary" paragraph>
                Upload a image to get more information about object in your photo!
            </Typography>
        </Paper >
    )
}
