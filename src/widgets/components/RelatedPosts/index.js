import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import * as api from "../../../api";


const RelatedPosts = (props) => {
    const { name } = props;
    const [optionTitle, setOptionTitle] = useState(null);
    const [optionNumber, setOptionNumber] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.fetchGET_Option(name);
            if (response) {
                const data = JSON.parse(response.data.option_value);
                setOptionTitle(data.title)
                setOptionNumber(data.number)
            }
        };
        fetchData();
    }, [name]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const Form = {
            "title": optionTitle,
            "number": optionNumber,
        }

        const data = {
            "option_name": name,
            "option_value": JSON.stringify(Form)
        }
        try {
            const response = await api.fetchPOST_Option(data);
            if (response.status === 201) {
                console.log("okkk");
            } else {
                console.error("Entered wrong information !");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={12}>
                    {/* <Typography component="h1" variant="h5">
                        Widget related posts widget
                    </Typography> */}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label>
                                    Title:
                                </label>
                                <TextField
                                    autoComplete="title"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    autoFocus
                                    value={optionTitle}
                                    onChange={(e) => setOptionTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <label>
                                    Number of posts to show:
                                </label>
                                <TextField
                                    autoComplete="number"
                                    name="number"
                                    required
                                    fullWidth
                                    id="number"
                                    autoFocus
                                    value={optionNumber}
                                    onChange={(e) => setOptionNumber(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Saved
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                </Grid>
            </Grid>
        </Box>

    )
}

export default RelatedPosts;