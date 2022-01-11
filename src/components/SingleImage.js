import { Button, CardActions, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Card, CardMedia } from '@mui/material';
import React, { useEffect } from 'react';

const SingleImage = ({ image }) => {
    useEffect(() => {
        console.log(image);
    }, []);
    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: "opacity 500ms ease-in-out" }}
        >
            <CardMedia
                sx={{ maxHeight: "500px" }}
                component="img"
                image={image.src}
                alt={image.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {image.title}
                </Typography>

                {image.excerpt &&
                    <div style={{ display: "flex" }}>
                        <Typography noWrap>
                            Confidence:
                        </Typography>
                        <Typography noWrap color={image.confidence >= 0.5 ? "success.main" : "error.main"}>
                            {" " + image.confidence * 100 + "%"}
                        </Typography>
                    </div>
                }

                {image.description &&
                    <Typography >
                        {image.description}
                    </Typography>
                }

                {image.excerpt &&
                    <Typography >
                        {image.excerpt}
                    </Typography>
                }
            </CardContent>
        </Card >
    );
}

export default SingleImage;
