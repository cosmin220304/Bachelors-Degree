const { setupDB } = require("./setupDB")
const user = require("../controllers/user.controller.js")

describe('users tests', () => {
  setupDB()
  
  let status, data
  res = {
    sendStatus: s => status = s,
    json: (d) => data = d,
    status: function(s) { status = s; return this; }
  }

  beforeEach(() => {
    status = 200
    data = null
  })

  it('should throw 404 error if database is empty', async () => {
    //arrange
    const req = { params: {}, query: {} };

    //act
    await user.getUsers(req, res)

    //assert
    expect(status).toBe(404)
    expect(data.error).toBe("no users found!")
  });

  it('can add user', async () => {
    //arrange
    const body = {
      "username": "cosmin0123",
      "email": "cosmin"
    }
    const req = { params: {}, query: {}, body };

    //act
    await user.createUser(req, res)

    //assert
    expect(status).toBe(201) 
  });

  it('should throw error if same user is added twice', async () => {
    //arrange
    const body = {
      "username": "cosmin0123",
      "email": "cosmin"
    }
    const req = { params: {}, query: {}, body };

    //act
    await user.createUser(req, res)

    //assert
    expect(status).toBe(409) 
  });

  it('can view users after at least one is added', async () => {
    //arrange 
    const req = { params: {}, query: {}, body: {} };

    //act
    await user.getUsers(req, res)

    //assert
    expect(status).toBe(200)
    expect(data.length).toBe(1) 
  });

  it('can get user by id', async () => {
    //arrange 
    const body = {
      "username": "new cosmin0123",
      "email": "new cosmin"
    }
    const req = { params: {}, query: {}, body};

    //act
    await user.createUser(req, res)
    req.params.id = data.user._id
    status = 200
    data = null
    await user.getUserById(req, res)

    //assert
    expect(status).toBe(200)
    expect(data).not.toBeNull()
  });
});