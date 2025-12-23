import express from 'express'

const app = express()

// Static files
app.use(express.static("public"))

// EJS view engine
app.set("view engine", "ejs")

// ===== Routes =====

// Home page
app.get('/', (req, res) => {
  res.render('index', { age: 200 }) 
})

// About page
app.get('/about', (req, res) => {
  res.render('about', { age: 200 })
})

// Test error route
app.get('/error', (req, res) => {
  throw new Error("This is a test error")
})

// ===== Catch all undefined routes =====
app.use((req, res, next) => {
    const err = new Error("Page not found")
  err.status = 404
  next(err)
})
// ===== Error handler =====
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  
  res.status(500)
  res.render('error', { error: err })
})

// ===== Server start =====
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
