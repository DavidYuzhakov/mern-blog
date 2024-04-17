import CommentModel from "../models/Comment.js"

export const get = async (req, res) => {
  try {
    const postId = req.params.id
    const comments = await CommentModel.find({ postId }).populate(['user', 'postId']).exec()
    res.json(comments)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to get comments'
    })
  }
}

export const create = async (req, res) => {
  try {
    const postId = req.params.id
    const doc = new CommentModel({
      postId,
      user: req.userId,
      text: req.body.text
    })
    const comments = await doc.save()
    res.json(comments)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to create the comment'
    })
  }
}