import { Button, CardActions, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Card, CardMedia } from '@mui/material';
import React, { useEffect } from 'react';

const SingleImage = (props) => {
    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                sx={{
                    // 16:9
                    pt: '56.25%',
                }}
                image={props.url}
                alt={props.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography>
                    {props.excerpt}
                </Typography>
            </CardContent>
            {/*
            <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
            </CardActions>
           */}
        </Card>
    );
}

export default SingleImage;
