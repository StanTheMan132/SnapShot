const postFunctions = require('./postFunctions');

it('Delete a user, happy route', async () => {
  const postId = 'AB123C';
  const userId = '1234abc';
  const username = 'test';
  const commentController = {
    deleteComments: jest.fn().mockName('deleteComments').mockReturnValue(true),
  };
  const Post = {
    findOneAndRemove: jest.fn().mockName('findOneAndRemove').mockReturnValue(true),
    findOne: jest.fn().mockName('findOne').mockReturnValue({ username }),
  };
  const User = {
    findOne: jest.fn().mockName('findOne').mockReturnValue({ _id: '1234abc' }),
  };
  const status = await postFunctions.deletePostandComments(postId, userId, Post, commentController, User);
  expect(Post.findOne).toBeCalledWith({ postId });
  expect(User.findOne).toBeCalledWith({ username });
  expect(commentController.deleteComments).toBeCalledWith(postId);
  expect(Post.findOneAndRemove).toBeCalledWith({ _id: postId });
  expect(status).toBe(true);
  return status;
});

it.skip('getLatestPost, happy route(no last post date, 5 post)', async () => {
  const postArray = [
    { imgUrl: 'www.coolimages.com/image1' },
    { imgUrl: 'www.coolimages.com/image2' },
    { imgUrl: 'www.coolimages.com/image3' },
    { imgUrl: 'www.coolimages.com/image4' },
    { imgUrl: 'www.coolimages.com/image5' },
  ];
  const Post = {
    find: jest.fn().mockName('find').mockReturnValue(postArray),
    sort: jest.fn(),
    limit: jest.fn(),
  };
  const status = await postFunctions.latestPost(null, Post);
});
