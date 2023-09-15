import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Posts from './Components/Blog';

import * as actions from '../../redux/actions';
import { postsState$ } from '../../redux/selectors';
import FieldRelatedPost from '../../widgets/fields/RelatedPost';
import CaoThu from '../Dashboard/components/CaoThu';

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
        <CaoThu />
    );
}
