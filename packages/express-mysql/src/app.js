const express = require('express')
const bodyParser = require('body-parser')
const createDBConnection = require('./db')

const app = express()
const port = 3001

app.use(bodyParser.json())

// 启动 Express 服务
app.listen(port, () => {
  console.log(`服务运行在 http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let db = null

// 创建 MySQL 连接
createDBConnection((e) => {
  db = e
})

// 创建用户
app.post('/user', (req, res) => {
  const { name, email, age } = req.body
  const sql = 'INSERT INTO User (name, email, age) VALUES (?, ?, ?)'
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      res.status(500).send('创建用户失败')
      return
    }
    res.status(201).send(`用户已创建，ID: ${result.insertId}`)
  })
})

// 获取所有用户
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM User'
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('获取用户列表失败')
      return
    }
    res.json(results)
  })
})

// 获取单个用户
app.get('/user/:id', (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM User WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send('获取用户失败')
      return
    }
    if (result.length === 0) {
      res.status(404).send('用户未找到')
      return
    }
    res.json(result[0])
  })
})

// 更新用户
app.put('/user/:id', (req, res) => {
  const { id } = req.params
  const { name, email, age } = req.body
  const sql = 'UPDATE User SET name = ?, email = ?, age = ? WHERE id = ?'
  db.query(sql, [name, email, age, id], (err, result) => {
    if (err) {
      res.status(500).send('更新用户失败')
      return
    }
    if (result.affectedRows === 0) {
      res.status(404).send('用户未找到')
      return
    }
    res.send('用户已更新')
  })
})

// 删除用户
app.delete('/user/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM User WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send('删除用户失败')
      return
    }
    if (result.affectedRows === 0) {
      res.status(404).send('用户未找到')
      return
    }
    res.send('用户已删除')
  })
})

// 捕获进程终止信号并断开 MySQL 连接
process.on('SIGINT', () => {
  console.log('捕获到 SIGINT 信号，断开数据库连接')
  db.end((err) => {
    if (err) {
      console.error('断开数据库连接失败：', err)
    } else {
      console.log('数据库连接已断开')
    }
    process.exit(err ? 1 : 0)
  })
})

process.on('SIGTERM', () => {
  console.log('捕获到 SIGTERM 信号，断开数据库连接')
  db.end((err) => {
    if (err) {
      console.error('断开数据库连接失败：', err)
    } else {
      console.log('数据库连接已断开')
    }
    process.exit(err ? 1 : 0)
  })
})
