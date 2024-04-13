const feedController = require('../../controllers/feedController');
const UserModel = require('../../models/userModel');
const FeedModel = require('../../models/feedModel');

// mocks
jest.mock('../../models/userModel');
jest.mock('../../models/feedModel');

// stubs
const req = {
    body: {

    },
    params:{
        id:'507f1f77bcf86cd799439011'
    }
};

const mockFeed = {
    userId: 1,
    name: 'fakename',
    profileImage: 'fakeurl',
    caption: 'fakecap',
    feedImg: 'fakeurl',
    likes: [0, 1, 2],
    likeCount: 0,
}

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

// show all feeds
test('Empty query for finding all feeds with 200', async () => {
    const mockArr = [mockFeed, mockFeed];
    await FeedModel.find.mockImplementation(()=> Promise.resolve(mockArr));
    const res = mockRes();
    await feedController.getAllFeeds(req, res);
    expect(FeedModel.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        message: "Fetched all feeds", result: mockArr
    });
});
test('Error while finding feeds', async () => {
    const errMsg = "Database Error";
    await FeedModel.find.mockImplementation(() => { throw new Error(errMsg) });
    const res = mockRes();
    await feedController.getAllFeeds(req, res);
    expect(FeedModel.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errMsg });
});


// get specific user feed
test('Return specific user feeds with 200', async () => {
    const mockArr = [mockFeed, mockFeed];
    const _id = req.params.id;
    await FeedModel.find.mockImplementation((query)=>{
        if(query && query.userId === _id) return Promise.resolve(mockArr);
        else return undefined;
    });
    const res = mockRes();
    await feedController.getUserFeeds(req,res);
    expect(FeedModel.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message:"Fetched feeds",result:mockArr});
});




