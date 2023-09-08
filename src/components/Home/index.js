import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Posts from './Components/Blog';

import * as actions from '../../redux/actions';
import { postsState$ } from '../../redux/selectors';
import FieldRelatedPost from '../../widgets/fields/RelatedPost';

export default function Home() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);
    let post = posts?.data || [];
    post = sortBy(post, (p) => new Date(p.post_date)).reverse();

    useLayoutEffect(() => {
        const fetchData = async () => {
            await Promise.all([dispatch(actions.getPosts.getPostsRequest())]);
        };

        fetchData();
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={8}>
                    <Posts post={post} />
                </Grid>
                <Grid item xs={6} md={4}>
                    <FieldRelatedPost post={post} />
                </Grid>
            </Grid>
        </Box>
    );
}
