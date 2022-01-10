import { Box, Button, CircularProgress, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AppTitles from './AppTitles';
import ResultsGallery from './ResultsGallery';
import SingleImage from './SingleImage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MobileNet = require('@tensorflow-models/mobilenet');

const MainApp = () => {
    const [results, setResults] = useState([]);
    const [gigaState, setGigaState] = useState(false);
    const fileInputRef = useRef(null);
    const showWelcomeTitlesFlag = useRef(false);
    const isImageBeingProcessed = useRef(false);
    const [loadMobileNetModel, setMobileNetModel] = useState(null);
    const [image, setImage] = useState({ src: null, title: null, excerpt: null, description: null, confidence: null });


    useEffect(() => {
        setMobileNetModel(async () => await MobileNet.load());
    }, []);

    useEffect(() => {

        if (showWelcomeTitlesFlag.current) {
            showWelcomeTitlesFlag.current = false;
            isImageBeingProcessed.current = false;

            setGigaState(true);
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

    //This function could be memoized
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleImageChange = (e) => {
        isImageBeingProcessed.current = true;
        setGigaState(false);
        loadMobilenetImage(URL.createObjectURL(e.target.files[0])).then(async img => {
            const predictions = await (await (loadMobileNetModel)).classify(img);
            const wikipediaResponse = await fetch("https://en.wikipedia.org/w/rest.php/v1/search/page?" + new URLSearchParams({
                limit: 1,
                q: predictions[0].className.split(',')[0],
            }));
            const wikipediaData = (await wikipediaResponse.json()).pages[0];
            if (wikipediaResponse.status === 200) {
                setImage((image) => {
                    showWelcomeTitlesFlag.current = true; //useEffect flag of results state, to imitate callback of setImage https://github.com/facebook/react/issues/14174
                    return {
                        src: URL.createObjectURL(e.target.files[0]),
                        title: capitalizeFirstLetter(predictions[0].className.split(',')[0]),
                        confidence: parseFloat(predictions[0].probability).toFixed(2),
                        description: wikipediaData.description,
                        excerpt: wikipediaData.title + " " + (wikipediaData.excerpt.replace(/<\/?[^>]+(>|$)/g, "").split(';')[0])  //trim html tags from response
                    }
                });
            }
        }).catch(err => console.error(err));

    }



    return (
        <Container disableGutters  >

            <Container sx={{ pt: 8, pb: 6 }} maxWidth="sm" >
                <Box sx={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                    {isImageBeingProcessed.current &&
                        <CircularProgress />
                    }

                    <CSSTransition
                        in={gigaState}
                        classNames="my-node"
                        timeout={{
                            appear: 1000,
                            enter: 1000,
                            exit: 1000,
                        }}
                    >
                        {gigaState ? <SingleImage image={image} /> : <React.Fragment /> //TODO (convert if to state)
                        }

                    </CSSTransition>

                    {!(gigaState || !!results.length) &&
                        <AppTitles />
                    }
                </Box>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={() => { fileInputRef.current.click(); }}>
                        <input ref={fileInputRef} type="file" id="image-upload" style={{ display: 'none' }} onChange={handleImageChange} />
                        {!!results.length ? 'Upload next image' : 'Upload image'}
                    </Button>
                </Stack>

            </Container >
            {
                !!results.length &&

                <Container sx={{ py: 8 }} >

                    <Typography sx={{ p: 8 }} align="center" variant="h4" component="h3">Recent results:</Typography>
                    <Paper elevation={3} sx={{ p: 4, bgcolor: "primary.main" }}>
                        <ResultsGallery results={results} />
                    </Paper>
                </Container>
            }
        </Container >
    );

}

export default MainApp;
