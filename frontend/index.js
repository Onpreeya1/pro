const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = '' //ตัวแปรแบบ Golbal ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('id', id)
  if (id) {
    mode = 'EDIT'
    selectedId = id

    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`)
      const user = response.data

      let genderDOMs = document.querySelectorAll('input[name=gender]')
      let firstNameDOM = document.querySelector('input[name=firstname]')
      let lastNameDOM = document.querySelector('input[name=lastname]')
      let addressDOM = document.querySelector('textarea[name=address]')
      let phoneDOM = document.querySelector('input[name=phone]')
      let positionDOM = document.querySelector('input[name=position]')
      let work_time_inDOMs = document.querySelector('input[name=work_time_in]')
      let work_time_outDOMs = document.querySelector('input[name=work_time_out]')
      let work_hoursDOMs = document.querySelector('input[name=work_hours]')
      let work_detailsDOM = document.querySelector('textarea[name=work_details]')
      let leave_typeDOM = document.querySelector('input[name=leave_type]')
      let leave_date_startDOMs = document.querySelector('input[name=leave_date_start]')
      let leave_date_endDOMs= document.querySelector('input[name=leave_date_end]')
      let leave_reasonDOM = document.getElementById('leave_reason')
    

      
  genderDOMs.value=user.gender
  firstNameDOM.value=user.firstName
  lastNameDOM.value=user.lastName
  addressDOM.value=user.address
  positionDOM.value=user.position
  phoneDOM.value=user.phone
  work_time_inDOMs.value=user.work_time_in
  work_time_outDOMs.value=user.work_time_out
  work_hoursDOMs.value=user.work_hours
  work_detailsDOM.value=user.work_details
  leave_typeDOM.value=user.leave_type
  leave_date_startDOMs.value=user.leave_date_start
  leave_date_endDOMs.value=user.leave_date_end
  leave_reasonDOM.value=user. leave_reason
    
     
  for (let i = 0; i < genderDOMs.length; i++) {
    if (genderDOMs[i].value == user.gender) {
      genderDOMs[i].checked = true
    }
  } 

  } catch (error) {
    console.log('error', error)
  }
 }
}
const validateData = (userData) => {
  let errors = []
  if (!employeeData.gender) {
    errors.push('กรุณาเลือกเพศ')
  }
  if (!employeeData.firstname) {
    errors.push('กรุณากรอกชื่อ')
  }
  if (!employeeData.lastname) {
    errors.push('กรุณากรอกนามสกุล')
  }
  if (!employeeData.address) {
    errors.push('กรุณากรอกที่อยู่')
  }
  if (!employeeData.phone) {
    errors.push('กรุณากรอกเบอร์โทร')
  
  }if (!employeeData.position) {
      errors.push('กรุณากรอกตำแหน่ง')
    }
  
  if (!employeeData.work_time_in){
    errors.push('กรุณากรอกเวลาเริ่มงาน')
  }
  if (!employeeData.work_time_out){
    errors.push('กรุณากรอกเวลาออกงาน')
  }
  if (!employeeData.work_hours){
    errors.push('กรุณากรอกจำนวนชั่วโมงการทำงาน')
  }
  if (!employeeData.work_details){
    errors.push('กรุณากรอกรายละเอียดการทำงาน')
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
  }
  const submitData = async () => {
  let genderDOM = document.querySelectorAll('input[name=gender]')
  let firstNameDOM = document.querySelector('input[name=firstname]')
  let lastNameDOM = document.querySelector('input[name=lastname]')
  let addressDOM = document.querySelector('textarea[name=address]')
  let phoneDOM = document.querySelector('input[name=phone]')
  let positionDOM = document.querySelector('input[name=position]')
  let work_time_inDOMs = document.querySelector('input[name=work_time_in]')
  let work_time_outDOMs = document.querySelector('input[name=work_time_out]')
  let work_hoursDOMs = document.querySelector('input[name=work_hours]')
  let work_detailsDOM = document.querySelector('textarea[name=work_details]')
  let leave_typeDOM = document.querySelector('input[name=leave_type]')
  let leave_date_startDOMs = document.querySelector('input[name=leave_date_start]')
  let leave_date_endDOMs= document.querySelector('input[name=leave_date_end]')
  let leave_reasonDOM = document.getElementById('leave_reason')

  try {

    console.log('test')
    let userData = {
      gender: genderDOM.value,
      firstName: firstNameDOM.value,
      lastName: lastNameDOM.value,
      address: addressDOM.value,
      phone: phoneDOM.value,
      position: positionDOM.value,
      work_time_in: work_time_inDOMs.value,
      work_time_out: work_time_outDOMs.value,
      work_hours: work_hoursDOMs.value,
      work_details: work_detailsDOM.value,
      leave_type: leave_typeDOM.value,
      leave_date_start: leave_date_startDOMs.value,
      leave_date_end: leave_date_endDOMs.value,
      leave_reason: leave_reasonDOM.value,

    }
    console.log('submit data', userData)

      const errors = validateData(userData)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ!',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ!'

      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/users`, userData)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
        message = 'แก้ไขข้อมูลสำเร็จ!'
        console.log('response', response.data)
      }
      messageDOM.innerText = message
      messageDOM.className = 'message success'

    } catch (error) {
      console.log('error message', error.message)
      console.log('error', error.erros)
      if (error.response) {
        console.log(error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
      }

      let htmlData = '<div>'
      htmlData += `<div>${error.message}</div>`
      htmlData += '<ul>'
      for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>${error.errors[i]}</li>`
      }
      htmlData += '</ul>'
      htmlData += '<div>'


      messageDOM.innerHTML = htmlData
      messageDOM.className = 'message danger'
    }
  }