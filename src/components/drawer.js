import React, { useState, useEffect } from "react";
import styles from "../Styles/drawer.module.css";
import CustomButton from "./Button";
import { useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getPostsBySearch } from "../redux/actions/post";
import { Typography, Avatar, TextField } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

function Drawer({ mobileOpen,setMobileOpen }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const searchPost = () => {
    console.log("search initiated");
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      setSearch("");
      setTags([]);
    } else {
      history.push("/");
    }
    (setMobileOpen)&&setMobileOpen(!mobileOpen)
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);
  const setHome = () => {(setMobileOpen)&&setMobileOpen(!mobileOpen);}
  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className={styles.main}>
      {user != null ? (
        <div className={styles.root}>
          <div className={styles.toolbar}>
            <Avatar
              className={styles.profile}
              alt={user?.result.name}
              src={user?.result.imageUrl}
              style={{ width: "100px", height: "100px" }}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography
              className={styles.userName}
              variant="h6"
              style={{ fontFamily: "Poppins", fontWeight: "600" }}
            >
              @{user?.result.name}
            </Typography>
          </div>
          <div style={{ margin:"10px 0"}}></div>
          <Link to="/create">
            <CustomButton text="Add photo" onClick={setHome} />
          </Link>
        </div>
      ) : (
        <Typography variant="h6" align="center" style={{ marginTop: "5%" }}>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      )}
      <div className={styles.searchTab}>
        <Link to="/">
          <CustomButton text="Home" onClick={setHome} />
        </Link>
        <TextField
          style={{ marginTop: "10px" }}
          onKeyDown={handleKeyPress}
          name="search"
          variant="outlined"
          label="Search Memories"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ChipInput
          style={{ margin: "10px 0" }}
          value={tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
          label="Search Tags"
          variant="outlined"
          fullWidth
        />
        <CustomButton onClick={searchPost} text="Search" />
      </div>
    </div>
  );
}

export default Drawer;
