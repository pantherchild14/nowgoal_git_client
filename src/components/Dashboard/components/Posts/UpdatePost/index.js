import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactQuill from 'react-quill';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import 'react-quill/dist/quill.snow.css';
import * as api from '../../../../../api';
import * as actions from '../../../../../redux/actions';
import { categoryState$, postsState$ } from '../../../../../redux/selectors';

const UpdatePost = (props) => {
    const { getIdPost } = props;
    const [content, setContent] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [featureImage, setFeatureImage] = useState(null);
    const [featureImageUrl, setFeatureImageUrl] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const dispatch = useDispatch();
    const category = useSelector(categoryState$);
    const posts = useSelector(postsState$);
    const categories = category?.data?.categories || [];
    const post = posts?.data || [];
    const isLocalUser = localStorage.getItem('USER_NAME');

    const toolbarOptions = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: [] }],
                ['blockquote'],
                ['link', 'image'],
                ['clean'],
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                dispatch(actions.getCategory.getCategoryRequest()),
                dispatch(actions.getPosts.getPostsRequest()),
            ]);
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const postToEdit = post.find((item) => item._id === getIdPost);

        if (postToEdit) {
            setContent(postToEdit.post_content);
            setCategoryID(postToEdit.category._id);
            setPostTitle(postToEdit.post_title);
            setFeatureImageUrl(postToEdit.post_image);
        }
    }, [post, getIdPost]);

    const handleSuccessClose = () => {
        setShowSuccessAlert(false);
    };

    const handleErrorClose = () => {
        setShowErrorAlert(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const input = new FormData(event.currentTarget);
        const Form = {
            post_author: isLocalUser,
            post_title: input.get('post_title'),
            post_content: content,
            category: categoryID,
            post_image: featureImageUrl,
        };

        try {
            const response = await api.fetchPut_Post(getIdPost, Form);
            if (response.status === 200) {
                setShowSuccessAlert(true);
            } else {
                setShowErrorAlert(true);
            }
        } catch (error) {
            setShowErrorAlert(true);
            console.error('An error occurred:', error);
        }
    };

    const handleChange = (event) => {
        setCategoryID(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFeatureImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFeatureImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFeatureImageUrl('');
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {showSuccessAlert && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success" onClose={handleSuccessClose}>
                            <AlertTitle>Success</AlertTitle>
                            Update success — <strong>check it out!</strong>
                        </Alert>
                    </Stack>
                )}
                {showErrorAlert && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error" onClose={handleErrorClose}>
                            <AlertTitle>Error</AlertTitle>
                            Entered wrong information — <strong>check it out!</strong>
                        </Alert>
                    </Stack>
                )}
                <Grid item xs={12} md={12}>
                    <Typography component="h1" variant="h5">
                        Edit Post
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="add_title"
                                    name="post_title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Edit title"
                                    autoFocus
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={20} sx={{ height: '480px' }}>
                                <ReactQuill
                                    value={content}
                                    onChange={setContent}
                                    modules={toolbarOptions}
                                    style={{ height: '400px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryID}
                                        label="Category"
                                        onChange={handleChange}
                                    >
                                        {categories.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    id="featureImage"
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="featureImage">
                                    <Button variant="contained" component="span" sx={{ mt: 3, mb: 2 }}>
                                        Upload Feature Image
                                    </Button>
                                </label>
                                <Typography variant="body2" color="textSecondary">
                                    {featureImageUrl ? (
                                        <img
                                            src={featureImageUrl}
                                            alt="Feature Image"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        />
                                    ) : (
                                        <img
                                            src={featureImageUrl}
                                            alt="Feature Image"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        />
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Save Changes
                        </Button>

                    </Box>
                </Grid>
                <Grid item xs={6} md={6}></Grid>
            </Grid>
        </Box>
    );
};

export default UpdatePost;
