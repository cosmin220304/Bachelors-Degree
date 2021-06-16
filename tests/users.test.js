const { setupDB } = require("./setupDB")
const user = require("../controllers/user.controller.js")
let status, data
res = {
  sendStatus: s => status = s,
  json: (d) => data = d,
  status: function (s) { status = s; return this }
}

describe("users tests", () => {
  setupDB()

  beforeEach(() => {
    status = 200
    data = null
  })

  it("should throw 404 error if database is empty", async () => {
    //arrange
    const req = { params: {}, query: {} }

    //act
    await user.getUsers(req, res)

    //assert
    expect(status).toBe(404)
    expect(data.error).toBe("no users found!")
  })

  it("can add user", async () => {
    //arrange
    const body = {
      "username": "cosmin0123",
      "email": "cosmin",
      "phoneNumber": "123",
      "uid": "123"
    }
    const req = { params: {}, query: {}, body }

    //act
    await user.createUser(req, res)

    //assert
    expect(status).toBe(201)
  })

  it("should throw error if same user is added twice", async () => {
    //arrange
    const body = {
      "username": "cosmin0123",
      "email": "cosmin",
      "phoneNumber": "123",
      "uid": "123"
    }
    const req = { params: {}, query: {}, body }

    //act
    await user.createUser(req, res)

    //assert
    expect(status).toBe(409)
  })

  it("can view users after at least one is added", async () => {
    //arrange 
    const req = { params: {}, query: {}, body: {} }

    //act
    await user.getUsers(req, res)

    //assert
    expect(status).toBe(200)
    expect(data.length).toBe(1)
  })

  it("can get user by id", async () => {
    //arrange  
    const req = { params: { id: "123" }, query: {} }

    //act  
    await user.getUserById(req, res)

    //assert
    expect(status).toBe(200)
    expect(data).not.toBeNull()
  })

  it("can get users by name", async () => {
    //arrange 
    const expected = {
      "username": "cosmin0123",
      "email": "cosmin",
      "phoneNumber": "123",
      "uid": "123"
    }
    const req = { params: {}, query: { username: "cosmin0123" }, body: {} }

    //act
    await user.getUsers(req, res)

    //assert
    expect(status).toBe(200)
    expect(data).toHaveLength(1)
    expect(data[0]).toHaveProperty("username", expected.username)
    expect(data[0]).toHaveProperty("email", expected.email)
  })

  it("can get users by partial name", async () => {
    //arrange 
    const expected = {
      "username": "cosmin0123",
      "email": "cosmin"
    }
    const req = { params: {}, query: { username: "cos" }, body: {} }

    //act
    await user.getUsers(req, res)

    //assert
    expect(status).toBe(200)
    expect(data).toHaveLength(1)
    expect(data[0]).toHaveProperty("username", expected.username)
    expect(data[0]).toHaveProperty("email", expected.email)
  })

  it("can update user", async () => {
    //arrange 
    oldEmail = "cosmin"
    const update_body = {
      "username": "new username",
    }
    const req = { params: { id: "123" }, query: {}, body: update_body }

    //act
    await user.updateUserById(req, res)
    const update_status = status

    await user.getUsers({ params: {}, query: { "username": "new username" }, body: {} }, res)

    //assert
    expect(update_status).toBe(200)
    expect(data).toHaveLength(1)
    expect(data[0]).toHaveProperty("email", "cosmin")
    expect(data[0]).toHaveProperty("username", "new username")
  })

  it("can delete user", async () => {
    //arrange 
    const user_to_be_deleted = {
      "username": "username that will be deleted",
      "email": "email that will be deleted",
      "phoneNumber": "12345",
      "uid": "12345"
    }
    const req = { params: {}, query: {}, body: user_to_be_deleted }

    //act
    await user.createUser(req, res)
    req.params.id = data.uid
    status = 200
    data = null
    await user.removeUserById(req, res)
    const delete_status = status
    await user.getUsers({ params: {}, query: { "username": "username that will be deleted" }, body: user_to_be_deleted }, res)

    //assert
    expect(delete_status).toBe(204)
    expect(data).toHaveProperty("error", "no users found!")
  })

  it("should throw error for non existing user", async () => {
    //arrange  
    const req = { params: { id: "invalid" }, query: {} }

    //act 
    await user.removeUserById(req, res)

    //assert
    expect(status).toBe(404)
    expect(data.error).toBe("user not found")
  })

  it("check for 500 erros for 100% code coverage", async () => {
    //arrange
    console.log = jest.fn()
    const req = null

    //act
    await user.getUsers(req, res)
    await user.createUser(req, res)
    await user.getUserById(req, res)
    await user.updateUserById(req, res)
    await user.removeUserById(req, res)

    //assert
    expect(status).toBe(500)
  })
})