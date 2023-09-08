import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert } from '@mui/material';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import ReactQuill from 'react-quill';

import * as api from "../../../../../api";
import * as actions from "../../../../../redux/actions";
import { categoryState$ } from '../../../../../redux/selectors';

const NewPost = () => {
    const [content, setContent] = useState('');
    const [categoryID, setCategoryID] = React.useState('');
    const [featureImage, setFeatureImage] = useState(null);
    const [featureImageUrl, setFeatureImageUrl] = useState('');


    const dispatch = useDispatch();
    const category = useSelector(categoryState$);
    const categories = category?.data?.categories || [];
    const isLocalUser = localStorage.getItem('USER_NAME');

    const toolbarOptions = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, false] }], // Headers
                ['bold', 'italic', 'underline', 'strike'], // Inline formatting
                [{ list: 'ordered' }, { list: 'bullet' }], // Lists
                [{ align: [] }], // Alignment
                ['blockquote'], // Blockquote
                ['link', 'image'], // Link and image buttons
                ['clean'], // Remove formatting
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    };

    useLayoutEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                dispatch(actions.getCategory.getCategoryRequest()),
            ]);
        };

        fetchData();
    }, [dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const input = new FormData(event.currentTarget);

        const Form = {
            "post_author": isLocalUser,
            "post_title": input.get('post_title'),
            "post_content": content,
            "category": categoryID,
            "post_image": featureImageUrl,
        }

        try {
            const response = await api.fetchPOST_Post(Form);

            if (response.status === 201) {
                console.log('Post created successfully');
            } else {
                console.error('Entered wrong information!');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleChange = (event) => {
        setCategoryID(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFeatureImageUrl(imageUrl);
        } else {
            setFeatureImageUrl('');
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={12}>
                    <Typography component="h1" variant="h5">
                        Add New Post
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
                                    label="Add title"
                                    autoFocus
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
                            {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
                            <Grid item xs={12} >
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
                                            <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
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
                                    name="post_image"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="featureImage">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Upload Feature Image
                                    </Button>
                                </label>
                                <Typography variant="body2" color="textSecondary">
                                    {featureImageUrl ? (
                                        <img src={featureImageUrl} alt="Feature Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    ) : (
                                        'No image selected'
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add New Category
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                </Grid>
            </Grid>
        </Box>

    )
}

export default NewPost;