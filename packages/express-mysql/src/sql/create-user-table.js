const tableName = 'User'

// 插入初始的测试数据
const insertTestData = (db) => {
  const insertUserQuery = `
      INSERT INTO ${tableName} (name, email, age) VALUES ('唐三藏', 'tsz@1.com', 999)
    `

  db.query(insertUserQuery, (err, result) => {
    if (err) throw err
    console.log(`测试数据插入成功，ID: ${result.insertId}`)
  })
}

// 创建 User 表
const createTable = (db) => {
  const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        age INT NOT NULL
      )
    `

  db.query(createUserTableQuery, (err) => {
    if (err) throw err
    console.log(`${tableName} 表已创建`)
  })

  insertTestData(db)
}

const createUserTable = (db) => {
  // 检查 User 表是否存在
  const checkUserTable = `SHOW TABLES LIKE '${tableName}'`

  db.query(checkUserTable, (err, result) => {
    if (err) throw err

    if (result.length > 0) {
      // 如果 User 表存在，则删除
      const dropUserTable = `DROP TABLE ${tableName}`
      db.query(dropUserTable, (err) => {
        if (err) throw err
        createTable(db)
      })
    } else {
      // User 表不存在，直接创建新表
      createTable(db)
    }
  })
}

module.exports = createUserTable
