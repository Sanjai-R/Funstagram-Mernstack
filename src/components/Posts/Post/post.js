import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grow,
} from "@material-ui/core/";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getId, deletePost, likePost } from "../../../redux/actions/post";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./Styles";
import { Link } from "react-router-dom";
const CustomToast = () =>{
  return (
    <div>
      <h4>
        Please login to like other's memories.
      </h4>
    </div>
  );
}
toast.configure()
const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [like, setLike] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
    const notify = () => {
      if (user === null) {
        toast.info(<CustomToast />, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
  const Likes = () => {
    if (post.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <Grow in>
            <FavoriteOutlinedIcon color="error" fontSize="small" />
          </Grow>
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorderOutlinedIcon color="error" fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
 
    return (
      <>
        <FavoriteBorderOutlinedIcon color="error" fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
          {post.name}
        </Typography>
        <Typography variant="body2" style={{ fontFamily: "Montserrat" }}>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Link to="/Create">
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                dispatch(getId(post._id));
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </Link>
        </div>
      )}

      <div className={classes.details}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h2"
          style={{ fontFamily: "Montserrat" }}
        >
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
        style={{ fontFamily: "Montserrat" }}
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ fontFamily: "Montserrat" }}
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            notify()
            dispatch(likePost(post._id));
            setLike(!like);
          }}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" style={{ color: "#4F46E5" }} /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
