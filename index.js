const Comment = require('./comment');

module.exports = async comments => {
    const authorsId = Comment.getAuthorsId(comments);
    const authors = await Comment.getAuthors(authorsId);

    return Comment.mergeAuthors(comments, authors);
}
