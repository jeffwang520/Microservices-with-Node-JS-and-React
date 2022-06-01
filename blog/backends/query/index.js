const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [], type };
  }

  if (type === 'CommentCreated') {
    const { id, content, status, postId } = data;
    const post = posts[postId];
    if (post !== undefined) {
      post.comments.push({ id, content, status, type });
      // console.log(posts);
    } else {
      console.log('Invalid Post, need further development here...')
      // get Post here ...
    }  
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;
    comment.type = type;
    comment.content = content;
  }

  console.log("Event Received by Query Service:", req.body.type);
  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
