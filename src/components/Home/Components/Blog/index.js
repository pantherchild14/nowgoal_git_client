import React, { useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { createHtmlExcerpt, createPostUrl } from '../../../../helpers';

export default function Posts(props) {
    const { post } = props;

    const topPosts = [];
    const middPosts = [];
    const bottomPosts = [];

    post.forEach((row, index) => {
        const postUrl = createPostUrl(row.post_title);
        if (index === 0 || index === 1) {
            topPosts.push(
                <div className="bxitem_post" key={row._id}>
                    <div className="thumb">
                        <Link to={postUrl}><img src={row.post_image} alt="Feature Image" style={{ background: '#1877f2' }} /></Link>
                        <div className="bxcat_abs"><a href="#">{row.category.name}</a></div>
                    </div>
                    <div className="bxtt">
                        <Link to={postUrl}><h5>{row.post_title}</h5></Link>
                        <p dangerouslySetInnerHTML={{ __html: createHtmlExcerpt(row.post_content, 120) }}></p>
                    </div>
                </div>
            );
        } else if (index === 2 || index === 3 || index === 4) {
            middPosts.push(
                <div className="bxitem_post" key={row._id}>
                    <div className="thumb">
                        <Link to={postUrl}><img src={row.post_image} alt="Feature Image" style={{ background: '#1877f2' }} /></Link>
                        <div className="bxcat_abs"><a href="#">{row.category.name}</a></div>
                    </div>
                    <div className="bxtt">
                        <Link to={postUrl}><h5>{row.post_title}</h5></Link>
                        <p dangerouslySetInnerHTML={{ __html: createHtmlExcerpt(row.post_content, 60) }}></p>
                    </div>
                </div>
            );
        } else {
            bottomPosts.push(
                <div className="bxflex_mg10 bxitem_post bxcol_5" key={row._id}>
                    <div className="thumb bxw30">
                        <Link to={postUrl}><img src={row.post_image} alt="Feature Image" style={{ background: '#1877f2' }} /></Link>
                        <div className="bxcat_abs"><a href="#">{row.category.name}</a></div>
                    </div>
                    <div className="bxtt bxw70">
                        <Link to={postUrl}><h5>{row.post_title}</h5></Link>
                        <p dangerouslySetInnerHTML={{ __html: createHtmlExcerpt(row.post_content, 120) }}></p>
                    </div>
                </div>
            );
        }
    });

    return (
        <div className='bxinner_archivepost'>
            <div className='bxtoptitle'>
                <div className='bxinner'>
                    <div className='bxlistbytax_top' >
                        {topPosts}
                    </div>
                    <div className='bxlistbytax_col3'>
                        {middPosts}
                    </div>
                </div>
            </div>
            <div className='bxflex bxflex_mg bxbtcontain'>
                <div className='bxcontainer_single bxw65'>
                    <div className='bxlistbytax_bottom'>
                        {bottomPosts}
                    </div>
                </div>
            </div>
        </div>

    );
}
