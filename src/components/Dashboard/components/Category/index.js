import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Alert } from '@mui/material';
import * as api from "../../../../api";
import * as actions from "../../../../redux/actions";
import { categoryState$ } from '../../../../redux/selectors';
import ListCategories from './ListCategories';

const Category = () => {
    const dispatch = useDispatch();
    const category = useSelector(categoryState$);
    const categories = category?.data?.categories || [];

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
            name: input.get('name'),
            slug: input.get('slug'),
            description: input.get('description'),
            termGroup: input.get('termGroup'),
        }
        const response = await api.fetchPOST_Category(Form)
        if (response.status === 201) {
            console.log("okkk");
        } else {
            <Alert severity="error">Entered wrong information !</Alert>
        }
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={5}>
                    <Typography component="h1" variant="h5">
                        Add New Category
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="slug"
                                    label="Slug"
                                    name="slug"
                                    autoComplete="slug"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextareaAutosize
                                    required
                                    fullWidth
                                    id="description"
                                    name="description"
                                    aria-label="minimum height"
                                    minRows={5} // Điều này giúp điều chỉnh chiều cao tối thiểu của textarea
                                    placeholder="Description"
                                    style={{ width: '100%' }} // Bạn có thể tùy chỉnh kích thước của textarea
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add New Category
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                    <ListCategories categories={categories} />
                </Grid>
            </Grid>
        </Box>

    )
}

export default Category;