import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import sortBy from 'lodash/sortBy';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import * as api from '../../../../../api';
import * as actions from '../../../../../redux/actions';
import { postsState$ } from '../../../../../redux/selectors';

export default function AllPosts({ setSelectedTab, setGetIdPost }) {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);
    let post = posts?.data || [];
    post = sortBy(post, (p) => new Date(p.post_date)).reverse();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useLayoutEffect(() => {
        const fetchData = async () => {
            await Promise.all([dispatch(actions.getPosts.getPostsRequest())]);
        };

        fetchData();
    }, [dispatch]);

    const handleNavigateToUpdatePost = (postId) => {
        setSelectedTab(9);
        setGetIdPost(postId);
    };

    const handleNavigateToDeletedPost = async (postId) => {
        try {
            const response = await api.fetchDelete_Post(postId);
            if (response.status === 200) {
                setShowSuccessAlert(true);
                const fetchData = async () => {
                    await Promise.all([dispatch(actions.getPosts.getPostsRequest())]);
                };
                fetchData();
            } else {
                setShowErrorAlert(true);
            }
        } catch (error) {
            setShowErrorAlert(true);
            console.error('An error occurred:', error);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessAlert(false);
    };

    const handleErrorClose = () => {
        setShowErrorAlert(false);
    };

    return (
        <TableContainer component={Paper}>
            {showSuccessAlert && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" onClose={handleSuccessClose}>
                        <AlertTitle>Success</AlertTitle>
                        Deleted success — <strong>check it out!</strong>
                    </Alert>
                </Stack>
            )}
            {showErrorAlert && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" onClose={handleErrorClose}>
                        <AlertTitle>Error</AlertTitle>
                        Deleted no success — <strong>check it out!</strong>
                    </Alert>
                </Stack>
            )}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {post.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.post_title}
                            </TableCell>
                            <TableCell>{row.post_author}</TableCell>
                            <TableCell>{row.category.name}</TableCell>
                            <TableCell>
                                {format(new Date(row.post_date), 'yyyy/MM/dd \'at\' h:mm a')}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleNavigateToUpdatePost(row._id)}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleNavigateToDeletedPost(row._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
