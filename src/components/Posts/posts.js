import React, { useEffect } from "react";
import Post from "./Post/post";
import { useSelector, useDispatch } from "react-redux";
import {  CircularProgress, Grow, Grid } from "@material-ui/core";
import { getPosts } from "../../redux/actions/post";
import {  useLocation } from "react-router-dom";
function Posts() {
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch,location]);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grow in>
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={7} md={4}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}

export default Posts;
