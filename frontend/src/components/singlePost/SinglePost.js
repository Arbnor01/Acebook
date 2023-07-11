import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";
import CreateComment from "../createComment/CreateComment";

const SinglePost = ({ navigate }) => {
  const [post, setPost] = useState({
    user: { email: "" },
    message: "",
    _id: "",
  });
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const params = useParams();
  const [refreshFeed, setRefreshFeed] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`/posts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPost(data.post);
          setRefreshFeed(false);
        });
    }
  }, [refreshFeed]);

  const handleRefresh = () => {
    setRefreshFeed(true); // Trigger the refresh action
  };

  if (token) {
    return (
      <>
        <h2>Post</h2>
        <div id="feed" role="feed">
          <Post post={post} key={post._id} />
        </div>
        <div id="new-comment">
          <CreateComment handleRefresh={handleRefresh}/>
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default SinglePost;
