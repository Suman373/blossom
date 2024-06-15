const authController = require('../../controllers/auth.controller');
const UserModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');

// mocks
jest.mock('jsonwebtoken');
jest.mock('../../models/user.model');

// jwt args
const payload = "fakePAYLOAD";
const secret = "fakeJWTSECRET";
const expiry = "2D";

// express res obj
const mockRes = () => {
    res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    return res;
}
// express req obj
const req = {
    body: {
        name: "fake_name",
        email: "fake_email",
        password: "fake_pass"
    }
}

// Clear mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});


// test create token 
test('Create JWT token for auth ', async () => {
    //  mock implementation for jwt.sign
    jwt.sign.mockImplementation((payload, secret, expiry) => {
        return 'fakeToken';
    });
    const token = await authController.createToken(payload, secret, expiry);
    // assert successful token generation
    expect(token).toBe('fakeToken');
});

// test register user
test('Register user with 201 ', async () => {
    UserModel.register.mockImplementation(() => ({
        name: 'fakename',
        email: 'fakeemail',
        password: 'fakepass'
    }));

    // mocking createToken 
    authController.createToken = jest.fn().mockReturnValue('fakeToken');
    const res = mockRes();
    const user = await authController.registerUser(req, res);

    // verify register invoke, status and json methods 
    expect(UserModel.register).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Registration successful", token: 'fakeToken' });
});

// test login user
test('Login the user with 200', async () => {
    // return the user obj containing _id,username....etc
    UserModel.login.mockImplementation(() => ({
        _id: 1,
        username: 'username',
        name: 'name',
        email: 'fakeEmail',
        completedDetails: false
    }));
    // createToken
    authController.createToken = jest.fn().mockReturnValue('fakeToken'); // mock the func to return fakeToken as a token (custom behaviour)
    const res = mockRes();
    await authController.loginUser(req, res);

    // assertions
    expect(UserModel.login).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith('token', 'fakeToken', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        user: {
            _id: expect.anything(),
            username: 'username',
            name: 'name',
            email: 'fakeEmail',
            completedDetails: false
        }
    });
});

// test logout user
test('Logout the user', async () => {
    const req = {
        cookie: 'fakeCookie'
    };
    const res = mockRes();
    await authController.logoutUser(req, res);
    expect(res.clearCookie).toHaveBeenCalledWith('token', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({message:"User logged out successfully"});
}
);