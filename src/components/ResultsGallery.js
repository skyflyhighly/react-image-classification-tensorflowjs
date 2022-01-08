import { Grid } from '@mui/material';
import React from 'react';
import SingleImage from './SingleImage';

const Resultsgallery = (props) => {


    return (

        < Grid container spacing={4} >
            {
                props.results.map((result) => (
                    <Grid item key={result} xs={12} sm={6} md={4}>
                        <SingleImage url={result.url} title={result.title} excerpt={result.excerpt} />
                    </Grid>
                ))
            }
        </Grid >
    );
}

export default Resultsgallery;
