import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RelatedPosts from "./components/RelatedPosts";

const Widgets = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Relation Post</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <RelatedPosts name="widget_related_posts_widget" />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    xs=4
                </Grid>
                <Grid item xs={4}>
                    xs=4
                </Grid>

            </Grid>
        </Box>
    )
}

export default Widgets;

