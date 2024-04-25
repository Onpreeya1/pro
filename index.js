const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()

app.use(bodyparser.json())
app.use(cors())

const port = 8000

let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 3306 // Correct port for MySQL
  })
}


const validateData = (employeeData) => {  // เปลี่ยนชื่อตัวแปรจาก userData เป็น employeeData
  let errors = []
  if (!employeeData.gender) {
    errors.push('เลือกเพศ')
  }
  // Other validation checks...
  return errors
}


if (!employeeData.firstname) {
  errors.push('กรุณากรอกชื่อ')
}
if (!employeeData.lastname) {
  errors.push('กรุณากรอกนามสกุล')
}

if (!employeeData.phone) {
  errors.push('กรุณากรอกเบอร์โทร')
}
if (!employeeData.address) {
  errors.push('กรุณากรอกที่อยู่')

}if (!employeeData.position) {
    errors.push('กรุณากรอกตำแหน่ง')
  }

if (!employeeData.work_start_time){
  errors.push('กรุณากรอกเวลาเริ่มงาน')
}
if (!employeeData.work_end_time){
  errors.push('กรุณากรอกเวลาออกงาน')
}
if (!employeeData.work_hours){
  errors.push('กรุณากรอกจำนวนชั่วโมงการทำงาน')
}
if (!employeeData.leave_types){
    errors.push('กรุณากรอกประเภทการลา')
  }
  if (!employeeData.leave_date_start){
    errors.push('กรุณากรอกวันที่เริ่มลา')
  }
  if (!employeeData.leave_date_end){
    errors.push('กรุณากรอกถึงวันที่ลา')
  }
  if (!employeeData.leave_reason){
    errors.push('กรุณากรอกหมายเหตุ')
  }

  return errors




// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async (req, res) => {
  const results = await conn.query('SELECT * FROM users')
  res.json(results[0])
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
  try {
    let employeeData = req.body; // ต้องกำหนดค่าของตัวแปร employeeData ก่อนใช้งาน

    const errors = validateData(employeeData);
    if (errors.length > 0) {
      throw {
        message: 'กรอกข้อมูลไม่ครบ',
        errors: errors
      };
    }
    const results = await conn.query('INSERT INTO users SET ?', employeeData);
    res.json({
      message: 'insert ok',
      data: results[0]
    });
  } catch (error) {
    const errorMessage = error.message || 'something wrong';
    const errors = error.errors || [];
    console.error('error message', error.message);
    res.status(500).json({
      message: errorMessage,
      errors: errors
    });
  }
});


// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM users WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

// path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateUser = req.body

    // Check if user exists
    const [existingUser] = await conn.query('SELECT * FROM users WHERE id = ?', id)
    if (existingUser.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id])
    res.json({
      message: 'update ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})



// path DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from users WHERE id = ?', parseInt(id))
    res.json({
      message: 'delete ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})

app.listen(port, async (req, res) => {
  await initMySQL()
  console.log('http server run at ' + port)
})