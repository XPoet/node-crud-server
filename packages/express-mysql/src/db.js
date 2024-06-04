const mysql = require('mysql2')
const createUserTable = require('./sql/create-user-table')

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
}

const createDBConnection = (cb) => {
  // 创建 MySQL 连接
  const db = mysql.createConnection(dbConfig)

  // 连接到数据库
  db.connect((err) => {
    if (err) {
      console.error('数据库连接失败：', err)
      return
    }
    console.log('已成功连接到数据库')

    // 创建空的 User 表
    createUserTable(db)

    cb(db)
  })
}

module.exports = createDBConnection
