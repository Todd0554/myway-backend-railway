import request from 'supertest'
import app from '../app.js'
import mongoose from 'mongoose'
import Site from '../models/siteModel.js'
import User from '../models/userModel.js'
import Blog from '../models/blogModel.js'

jest.useRealTimers();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
})

afterAll(async () => {
  await mongoose.connection.close()
})

// test server start request '/'
describe("GET /", () => {
  it("should respond with a 200 status code", async () => {
      await request(app).get('/').expect(200).expect('Content-Type', /json/)
    })
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// test sites API
describe("sites", () => {
    // API test: GET /api/sites
    describe('GET /api/sites', () => {
      it("should respond with 200", async () => {
        await request(app).get(`/api/sites`).expect(200)
      })
    })
    // API test: POST /api/sites
    describe('POST /api/sites', () => {
      it("should post a new site", async () => {
        const response = await request(app).post('/api/users/login').send({
          email: "admin@example.com",
          password: "123456"
        });
        const token = await response.body.token;
        const site = await request(app).post(`/api/sites`).set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`)
        expect(site.body.name).toBe("name of the site");
      })
    })

    // API test: GET /api/sites/:id
    describe('GET /api/sites/:id', () => {
      describe('given the site not exist',() => {
        it("should respond with 500", async () => {
          const siteId = 'site1234'
          await request(app).get(`/api/sites/${siteId}`).expect(500)
        })
      })
      describe('given the site exist', () => {
        it("should respond with accurate data", async () => {
          const site = await Site.findOne({name: "The BIG BANANA in Coffs Harbour"})
          const id = site._id
          const res = await request(app).get(`/api/sites/${id}`)
          expect(res.body.name).toBe("The BIG BANANA in Coffs Harbour")
        })
      })
    })

    // API test: PUT /api/sites/:id
    describe('PUT /api/sites/:id', () => {
      it("should post a new site with accurate data", async () => {
        const response = await request(app).post('/api/users/login').send({
          email: "admin@example.com",
          password: "123456"
        });
        const token = await response.body.token;
        const targetSite = await Site.findOne({name: "name of the site"})
        const targetSiteId = targetSite._id
        const site = await request(app).put(`/api/sites/${targetSiteId}`).send({
          name: "change name",
          description: "The Big Banana is Australia's ",
          rating: 4.0,
          numComments: 5,
          image: "/images/bigbanana.jpg",
          category: "park",
          "lat": 123,
          "lng": 11
        }).set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`)
        expect(site.body.name).toBe("change name");
      })
    })

    // API test: DELETE api/sites/:id
    describe("DELETE api/sites/:id", () => {
      it("should delete a site", async () => {
        const response = await request(app).post('/api/users/login').send({
          email: "admin@example.com",
          password: "123456"
        });
        const token = await response.body.token;
        const targetSite = await Site.findOne({name: "change name"})
        const targetSiteId = targetSite._id
        const site = await request(app).delete(`/api/sites/${targetSiteId}`).set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`)
        expect(site.statusCode).toBe(200);
      })
    })
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// test users API
describe("users", () => {
  // API test: POST api/users/login
  describe("POST api/users/login", () => {
    it("should response with 200", async () => {
      const response = await request(app).post('/api/users/login').send({
        email: 'todd@example.com',
        password: '123456'
      })
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toBe('todd')
    })
  })

  // API test: POST api/users/register
  describe("POST api/users/register", () => {
    it("should response with 201", async () => {
      const response = await request(app).post('/api/users/register').send({
        name: "heyhey",
        email: 'heyhey@example.com',
        password: '123456'
      })
      expect(response.statusCode).toBe(201)
      expect(response.body.name).toBe('heyhey')
      // this new user will be deleted in the deleting test "DELETE api/users/:id"
    })
  })

  // API test: GET api/users
  describe("GET api/users", () => {
    it("should response with 200", async () => {
      const admin = await request(app).post('/api/users/login').send({
        email: 'admin@example.com',
        password: '123456'
      })
      const token = await admin.body.token
      const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })
  })

  // API test: GET api/users/profile
  describe("GET api/users/profile", () => {
    it("should response with 200", async () => {
      const admin = await request(app).post('/api/users/login').send({
        email: 'todd@example.com',
        password: '123456'
      })
      const token = await admin.body.token
      const response = await request(app).get('/api/users/profile').set('Authorization', `Bearer ${token}`)
      expect(response.body.name).toBe('todd')
    })
  })

  // API test: PUT /api/users/profile
  describe('PUT /api/users/profile', () => {
    it("should get correct of updated info", async () => {
      const response = await request(app).post('/api/users/login').send({
        email: "heyhey@example.com",
        password: "123456"
      });
      const token = await response.body.token;
      const res = await request(app).put(`/api/users/profile`).send({
        name: "hey",
      }).set('Content-Type', 'application/json').set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`)
      expect(res.body.name).toBe("hey");
    })
  })

  // API test: DELETE api/users/:id
  describe("DELETE api/users/:id", () => {
    it("should response with 200", async () => {
      const admin = await request(app).post('/api/users/login').send({
        email: 'admin@example.com',
        password: '123456'
      })
      const token = await admin.body.token
      const targetUser = await User.findOne({name: 'hey'})
      const targetUserId = targetUser._id
      const response = await request(app).delete(`/api/users/${targetUserId}`).set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })
  })
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// test blogs API
describe("blogs", () => {
  // API test: POST api/blogs
  describe("POST api/blogs", () => {
    it("should response with 200 and get the new blog", async () => {
      const user = await request(app).post('/api/users/login').send({
        email: 'todd@example.com',
        password: '123456'
      })
      const token = await user.body.token
      const response = await request(app).post(`/api/blogs`).set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`).send({
        image: "path of the image",
        article: "Blog test article.",
        title: "Blog test title."
      })
      expect(response.statusCode).toBe(201)
      expect(response.body.title).toBe("Blog test title.")
    })
  })

    // API test: GET api/blogs
    describe("GET api/blogs", () => {
      it("should show all the blogs", async() => {
        const user = await request(app).post('/api/users/login').send({
          email: 'todd@example.com',
          password: '123456'
        })
        const token = await user.body.token
        const response = await request(app).get(`/api/blogs`).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
      })
    })

    // API test: GET api/blogs/:userId/all
    describe("GET api/blogs/:userId/all", () => {
      it("should show all the blogs of one user who log in", async() => {
        const user = await request(app).post('/api/users/login').send({
          email: 'todd@example.com',
          password: '123456'
        })
        const token = await user.body.token
        const userId = await user.body._id
        const response = await request(app).get(`/api/blogs/${userId}/all`).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
      })
    })

    // API test: GET api/blogs/:id
    describe("GET api/blogs/:id", () => {
      it("should return right blog", async () => {
        const user = await request(app).post('/api/users/login').send({
          email: 'xinzhe@example.com',
          password: '123456'
        })
        const token = await user.body.token
        const blog = await Blog.findOne({title: "Blog test title."})
        const blogId = blog._id
        const response = await request(app).get(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe("Blog test title.")
      })
    })

    // API test: DELETE api/blogs/:id
    describe("DELETE api/blogs/:id", () => {
      // wrong user failed to delete 
      describe("delete with wrong user", () => {
        it("should response with 401", async () => {
          const user = await request(app).post('/api/users/login').send({
            email: 'xinzhe@example.com',
            password: '123456'
          })
          const token = await user.body.token
          const blog = await Blog.findOne({title: "Blog test title."})
          const blogId = blog._id
          const response = await request(app).delete(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${token}`)
          expect(response.statusCode).toBe(401)
        })
      })

      // right user successfully delete
      describe("delete with right user", () => {
        it("should response with 200 and get the new blog", async () => {
          const user = await request(app).post('/api/users/login').send({
            email: 'todd@example.com',
            password: '123456'
          })
          const token = await user.body.token
          const blog = await Blog.findOne({title: "Blog test title."})
          const blogId = blog._id
          const response = await request(app).delete(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${token}`)
          expect(response.statusCode).toBe(200)
        })
      })

      // admin successfully delete
      describe("delete with admin user", () => {
        it("should response with 200 and get the new blog", async () => {
          const user = await request(app).post('/api/users/login').send({
            email: 'todd@example.com',
            password: '123456'
          })
          const token = await user.body.token
          const response = await request(app).post(`/api/blogs`).set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`).send({
            image: "path of the image",
            article: "Blog test article.",
            title: "Blog test title."
          })
          const blogId = await response.body._id
          const userAdmin = await request(app).post('/api/users/login').send({
            email: 'admin@example.com',
            password: '123456'
          })
          const tokenAdmin = await userAdmin.body.token
          const responseDelete = await request(app).delete(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${tokenAdmin}`)
          expect(responseDelete.statusCode).toBe(200)
        })
      })
    })
})