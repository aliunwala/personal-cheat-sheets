let posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

// @desc Get all posts
// @route  GET /api/posts
export const getPosts = (req, res, next) => {
  // GET localhost:8000/api/posts?limit=2
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  return res.status(200).json(posts);
};

// @desc Get a post
// @route  GET /api/post/:id
export const getPost = (req, res, next) => {
  // GET localhost:8000/api/posts/2
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // return res.status(404).json({ msg: `A post with ${id} was not found` });
    const error = new Error(`A post with ${id} was not found`);
    error.status = 404;
    next(error);
    return;
  }
  return res.status(200).json(post);
};
// @desc createa a post
// @route  POST /api/posts/
export const createPost = (req, res, next) => {
  // POST localhost:8000/api/posts
  // WITH x-www-form-urlencoded {"title":"myTitle"}
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    // return res.status(400).json({ msg: "A new post must have a title" });
    const error = new Error(`A new post must have a title`);
    error.status = 400;
    next(error);
    return;
  }
  posts.push(newPost);
  res.status(201).json(posts);
};

// @desc update a post title
// @route  PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  // PUT localhost:8000/api/posts/3
  // WITH x-www-form-urlencoded {"title":"NEWTitle"}
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // res.status(404).json({ msg: `A post with id: ${id} was not found` });
    const error = new Error(`A post with id: ${id} was not found`);
    error.status = 404;
    next(error);
    return;
  }
  post.title = req.body.title;
  res.status(201).json(posts);
};

// @desc delete a post
// @route  DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  // DELETE localhost:8000/api/posts/2
  const id = parseInt(req.params.id);
  const post = posts.findIndex((e) => e.id === id);
  if (!post) {
    // res.status(404).json({ msg: `A post with id: ${id} was not found` });
    const error = new Error(`A post with id: ${id} was not found`);
    error.status = 404;
    next(error);
    return;
  }
  // posts.splice(post, 1); // do not use delete. Filter is better.
  posts = posts.filter((e) => e.id !== id);
  res.status(200).json(posts);
};
