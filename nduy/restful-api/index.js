const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const app = express()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
const router = express.Router()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 3001

const user = { username: '', password: '', firstName: '', lastName: '' }

const problems = [
  { id: '1287B', name: 'Hyperset', type: 'Programming', points: 300, rating: 1500, tags: ['brute force', 'data structures', 'implementation'], content: 'abcdef' },
  { id: '1287A', name: 'Angry Students', type: 'Programming', points: 500, rating: 800, tags: ['greedy'], content: 'abcdef' },
  { id: '1286F', name: 'Harry The Potter', type: 'Programming', points: 500, rating: 3200, tags: ['dp', 'brute force', 'math', 'constructive algorithms', 'fft'], content: 'abcdef' },
  { id: '1286D', name: 'LLC', type: 'Programming', points: 500, rating: 2900, tags: ['probabilities', 'math', 'data structure'], content: 'abcdef' },
  { id: '1286B', name: 'Numbers on Tree', type: 'Programming', points: 500, rating: 2000, tags: ['graphs', 'trees', 'sortings'], content: 'abcdef' },
]

router.post("/login", (req, res, next) => {
  user.username = req.body.username
  user.password = req.body.password
  if (user.username === "admin" && user.password === "123")
    return res.send(user)
  return res.status(400).send('Login failed!')
})

router.post("/register", (req, res, next) => {
  user.username = req.body.username
  user.password = req.body.password
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  return res.send(user)
})

router.get("/problems", (req, res, next) => {
  return res.send(problems)
})

router.get("/problem/:id", (req, res, next) => {
  let problem = problems.filter(problem => problem.id === req.params.id)
  if (problem[0]) return res.send(problem[0])
  else return res.status(404).send('Problem not found!')
})

router.delete("/problem/:id", (req, res, next) => {
  let deleteIndex = problems.findIndex(problem => problem.id === req.params.id)
  if (deleteIndex !== -1) {
    return res.status(200).send('Delete problem successfully!')
  }
  else return res.status(404).send('Problem not found!')
})

router.put("/problem/:id", (req, res, next) => {
  let updateIndex = problems.findIndex(problem => problem.id === req.params.id)
  let newProblem = {
    id: req.params.id,
    name: req.body.name,
    type: req.body.type,
    points: req.body.points,
    rating: req.body.rating,
    tags: req.body.tags
  }
  if (updateIndex === -1) problems.push(newProblem)
  else problems[updateIndex] = newProblem
  return res.send(problems)
})

router.post("/problem", (req, res, next) => {
  let newProblem = {
    id: req.body.id,
    name: req.body.name,
    type: req.body.type,
    points: req.body.points,
    rating: req.body.rating,
    tags: req.body.tags
  }
  let index = problems.findIndex(problem => problem.id === newProblem.id)
  if (index !== -1) return res.status(400).send('Problem existed!')
  else {
    problems.push(newProblem)
    return res.send('Create problem successfully!')
  }
})

router.post("/photos/upload", upload.single('solution'), (req, res, next) => {
  if (!req.file)
    return res.status(400).send('Upload file failed!')
  return res.send(req.file)
})

app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
