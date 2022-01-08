import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ResultsGallery from './ResultsGallery';
import SingleImage from './SingleImage';

const MobileNet = require('@tensorflow-models/mobilenet');

const MainApp = () => {
    const [results, setResults] = useState([]);
    const fileInputRef = useRef(null);
    const [loadMobileNetModel, setMobileNetModel] = useState(null);
    const [image, setImage] = useState({ src: null, title: null, excerpt: null, confidence: null });

    useEffect(() => {
        setMobileNetModel(async () => await MobileNet.load());
    }, []);

    const loadMobilenetImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', (err) => reject(err));
            img.src = src;
        })
    }

    const handleImageChange = (e) => {

        setImage({
            src: URL.createObjectURL(e.target.files[0]),
            excerpt: null,
            title: null,
            confidence: null,
        });
        loadMobilenetImage(URL.createObjectURL(e.target.files[0])).then(async img => {
            const predictions = await (await (loadMobileNetModel)).classify(img);
            console.log('Predictions: ');
            console.log(predictions);
        }).catch(err => console.error(err));
    }
    return (
        <React.Fragment>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    {
                        !loadMobileNetModel &&
                        <h1>loading </h1>
                    }
                    {image.src &&
                        <SingleImage url={image.src} />
                    }

                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Image Classification Demo
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Upload a image to get more information about object in your photo!
                    </Typography>

                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button variant="contained" onClick={() => { fileInputRef.current.click(); }}>
                            <input ref={fileInputRef} type="file" id="image-upload" style={{ display: 'none' }} onChange={handleImageChange} />
                            Upload Photo
                        </Button>
                    </Stack>
                </Container>
            </Box>

            <Container sx={{ py: 8 }} maxWidth="md">
                <ResultsGallery results={results} />
            </Container>
        </React.Fragment>
    );

}

export default MainApp;
