const feedController = require('../../controllers/feed.controller');
const UserModel = require('../../models/user.model');
const FeedModel = require('../../models/feed.model');

// mocks
jest.mock('../../models/user.model');
jest.mock('../../models/feed.model');

// stubs
const req = {
    body: {
        userId:'507f1f77bcf86cd799439011',
        name:'fakename',
        likeId:'507f1f77bcf86cd799439011'
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

// add new feed
test('Add new feed with 201', async()=>{
    await UserModel.findOne.mockImplementation((query)=>{
        // req.body.userId = "507f1..." 
        if(query && query._id === "507f1f77bcf86cd799439011") return true;
        else return null;
    });
    await FeedModel.create.mockResolvedValue(mockFeed);
    const res = mockRes();
    await feedController.addNewFeed(req,res);
    expect(UserModel.findOne).toHaveBeenCalled();
    expect(FeedModel.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"Feed created successfully",result:mockFeed});
});


// update feed with userid
test('Update user feed with id, 200', async()=>{
    await UserModel.findOne.mockImplementation((query)=>{
        if(query && query.name === "fakename") return {name:"FakeUser"};
        else return null;
    });
    await FeedModel.findByIdAndUpdate.mockImplementation((_id,update,options)=>{
        if(_id === "507f1f77bcf86cd799439011" && update && options) return mockFeed;
        else return null;
    });
    const res = mockRes();
    await feedController.updateUserFeed(req,res);
    expect(UserModel.findOne).toHaveBeenCalled();
    expect(FeedModel.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({message:"Feed updated successfully",result:mockFeed});
});

// like/unlike feed
test('Like or unlike a feed, 200', async()=>{
    await FeedModel.exists.mockImplementation((query)=> {
        if(query && query._id==="507f1f77bcf86cd799439011") return true;
        else return false;
    })
    await FeedModel.findByIdAndUpdate.mockResolvedValue((_id,update,options)=>{
        if(_id && update && options) return {_id:_id, ...update};
        else return null;
    });
    const res = mockRes();
    await feedController.likeFeed(req,res);
    // assert
    expect(FeedModel.exists).toHaveBeenCalled();
    expect(FeedModel.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
});
