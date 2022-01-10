import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ResultsGallery from './ResultsGallery';
import SingleImage from './SingleImage';

const MobileNet = require('@tensorflow-models/mobilenet');

const MainApp = () => {
    const [results, setResults] = useState([]);
    const fileInputRef = useRef(null);
    const newImageFlag = useRef(false);
    const [loadMobileNetModel, setMobileNetModel] = useState(null);
    const [image, setImage] = useState({ src: null, title: null, excerpt: null, description: null, confidence: null });

    useEffect(() => {
        setMobileNetModel(async () => await MobileNet.load());
    }, []);

    useEffect(() => {
        if (newImageFlag.current) {
            newImageFlag.current = false;
            setResults(results => [...results, image])
        }
        return;
    }, [image]);

    const loadMobilenetImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', (err) => reject(err));
            img.src = src;
        })
    }



    const handleImageChange = (e) => {


        setImage((image) => ({
            ...image, src: URL.createObjectURL(e.target.files[0])
        }));

        loadMobilenetImage(URL.createObjectURL(e.target.files[0])).then(async img => {
            const predictions = await (await (loadMobileNetModel)).classify(img);
            const newImage = null;
            setImage(image => ({
                ...image,
                title: predictions.className,
                confidence: parseFloat(predictions.probability).toFixed(2)
            }));

            const wikipediaResponse = await fetch("https://en.wikipedia.org/w/rest.php/v1/search/page?" + new URLSearchParams({
                limit: 1,
                q: predictions[0].className.split(',')[0],
            }));

            const wikipediaData = (await wikipediaResponse.json()).pages[0];
            console.log(wikipediaData);
            if (wikipediaResponse.status === 200) {
                //trim html tags from response
                //https://github.com/facebook/react/issues/14174

                /*
                       setImage((image => ({
                    ...image,
                    description: wikipediaData.description,
                    excerpt: wikipediaData.title + " " + (wikipediaData.excerpt.replace(/<\/?[^>]+(>|$)/g, "").split(';')[0])
                })), console.log("tre"));
                */

                setImage(
                    image => {
                        newImageFlag.current = true; //useEffect flaq of results state 
                        return {
                            ...image,
                            description: wikipediaData.description,
                            excerpt: wikipediaData.title + " " + (wikipediaData.excerpt.replace(/<\/?[^>]+(>|$)/g, "").split(';')[0])
                        }
                    });


            }
            //Not works
            //https://pl.reactjs.org/docs/faq-state.html
            //https://github.com/facebook/react/issues/11527#issuecomment-360199710

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
                        <SingleImage image={image} />
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
