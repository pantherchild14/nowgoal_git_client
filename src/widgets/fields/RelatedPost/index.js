import React, { useState, useEffect } from "react";
import { format } from 'date-fns';

import { Link } from 'react-router-dom';

import * as api from "../../../api";
import { createPostUrl } from "../../../helpers";

const FieldRelatedPost = (props) => {
    const { post } = props;

    const [optionTitle, setOptionTitle] = useState(null);
    const [optionNumber, setOptionNumber] = useState(null);
    const name = 'widget_related_posts_widget';

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.fetchGET_Option(name);
            if (response) {
                const data = JSON.parse(response.data.option_value);
                setOptionTitle(data.title);
                setOptionNumber(data.number);
            }
        };
        fetchData();
    }, [name]);

    return (
        <div className="nc-WidgetItem blog-box recent-post mb-8">
            <div className="nc-WidgetHeading1 relative h1 title">{optionTitle}</div>
            <ul>
                {post.slice(0, optionNumber).map((row) => {
                    const postUrl = createPostUrl(row.post_title);
                    return (
                        <li key={row._id}>
                            <Link to={postUrl}>
                                <span className="post-left" style={{ background: `url(${row.post_image})` }}></span>
                                <span className="post-right">
                                    <h2>{row.post_title}</h2>
                                    <b>{format(new Date(row.post_date), 'd MMMM, yyyy')}</b>
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FieldRelatedPost;
