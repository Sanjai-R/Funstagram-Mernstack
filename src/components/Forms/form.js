import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grow } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { Container, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import { getId } from "../../redux/actions/post";
import { updatePost, createPosts } from "../../redux/actions/post";
import { useHistory } from "react-router-dom";
const Form = () => {
  const currentId = useSelector((state) => state.getId);
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPosts({...postData, name: user?.result?.name}));
    }
    clear()
    history.push("/");
  };
  const clear= () =>{
    dispatch(getId(""));
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  }


  return (
    <Grow in>
      <Container component="main" >
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "90vh" }}
        >
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
              >
                <Typography variant="h6">
                  {!currentId ? "Creating a Memory" : "Editing a memory"}
                </Typography>
                <TextField
                  name="title"
                  variant="outlined"
                  label="Title"
                  fullWidth
                  value={postData.title}
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                  }
                />
                <TextField
                  name="message"
                  variant="outlined"
                  label="Message"
                  fullWidth
                  multiline
                  rows={4}
                  value={postData.message}
                  onChange={(e) =>
                    setPostData({ ...postData, message: e.target.value })
                  }
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Tags (coma separated)"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      tags: e.target.value.split(","),
                    })
                  }
                />
                <div className={classes.fileInput}>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setPostData({ ...postData, selectedFile: base64 })
                    }
                  />
                </div>
                <Button
                  className={classes.buttonSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="#6f00ff"
                  size="small"
                  fullWidth
                  onClick={clear}
                >
                  Clear
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Form;
