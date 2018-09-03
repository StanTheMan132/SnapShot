const postFunctions = require('./postFunctions');

it('Delete a user, happy route', async () => {
  const postId = 'AB123C';
  const commentController = {
    deleteComments: jest.fn().mockName('deleteComments').mockReturnValue(true),
  };
  const Post = {
    findOneAndRemove: jest.fn().mockName('findOneAndRemove').mockReturnValue(true),
  };
  const status = await postFunctions.deletePostandComments(postId, Post, commentController);
  expect(commentController.deleteComments).toBeCalledWith(postId);
  expect(Post.findOneAndRemove).toBeCalledWith({ _id: postId });
  expect(status).toBe(true);
  return status;
});
