<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { db } from '../firebase/firebase.js'
import { collection, deleteDoc, addDoc, onSnapshot, doc, getDoc, query, orderBy } from 'firebase/firestore'

onMounted(() => {
  // onSnapshot(collection(db, 'employees'), (querySnapshot) => {
  //   let empTmp = []
  //   querySnapshot.forEach((doc) => { 
  //     const employee = {
  //       id: doc.id,
  //       lastname: doc.data().lastname,
  //       firstname: doc.data().firstname,
  //       gender: doc.data().gender,
  //       contactNo: doc.data().contactNo,
  //       position: doc.data().position
  //     }
  //     empTmp.push(employee)
  //   })

  //   employees.value = empTmp
  //   console.log(employees)
  // })

  const q = query(collection(db, 'employees'), orderBy('lastname')); //fetch data from firestore with query clause
  
  onSnapshot(q, (querySnapshot) => {
    let empTmp = []
    querySnapshot.forEach((doc) => { 
      const employee = {
        id: doc.id,
        lastname: doc.data().lastname,
        firstname: doc.data().firstname,
        gender: doc.data().gender,
        contactNo: doc.data().contactNo,
        position: doc.data().position
      }
      empTmp.push(employee)
    })

    employees.value = empTmp
    console.log(employees)
  })
})

const lastname = ref('')
const firstname = ref('')
const gender = ref('')
const contactNo = ref('')
const position = ref('')

const employees = ref([])

const addEmployee = () => {
  if (lastname.value != '' && firstname.value != '' && gender.value != '' && contactNo.value != '' && position.value != '') {
    
    const employee = {
        lastname: lastname.value,
        firstname: firstname.value,
        gender: gender.value,
        contactNo: contactNo.value,
        position: position.value
      }
    addDoc(collection(db, "employees"),employee)
    lastname.value = ''
    firstname.value = ''
    gender.value = ''
    contactNo.value = ''
    position.value = ''
  }
}
</script>
<template>
  <div class="container mt-3">
    <div class="row">
      <div class="container d-flex justify-content-between">
        <h3>Employees</h3> {{ firstname }}
      </div>
      <div class="container col-md-12">
          <div class="container d-flex align-items-center p-3">
            <p class="w-50 mb-0 fw-semibold">Name</p>
            <div class="container d-flex justify-content-between">

              <div class="container">
                <p class="mb-0 fw-semibold">Gender</p>
              </div>
              <div class="container">
                <p class="mb-0 fw-semibold">Contact #</p>
              </div>
              <div class="container text-start">
                <p class="mb-0 fw-semibold">Position</p>
              </div>
              <div class="container text-end">
                <p class="mb-0 fw-semibold">...</p>
              </div>
            </div>
          </div>
          <div class="container p-3 border rounded mb-1 shadow-sm" id="addEmp"
            data-bs-toggle="modal" data-bs-target="#exampleModal"
            >
            <p class="mb-0 fw-semibold"><i class="fa-solid fa-user-plus"></i>&nbsp; Add New Employee</p>
          </div>
            
          <div v-for="emp in employees" :key="emp.id" class="container d-flex align-items-center p-3 border rounded mb-1 shadow-sm" id="employee" >
            <p class="w-50 mb-0 fw-semibold">{{emp.lastname}}, {{emp.firstname}}</p>
            <div  class="container d-flex justify-content-between">
              <div class="container">
                <p class="mb-0 fw-normal">{{emp.gender}}</p>
              </div>
              <div class="container">
                <p class="mb-0 fw-normal">{{emp.contactNo}}</p>
              </div>
              <div class="container text-start">
                <p class="mb-0 fw-normal">{{emp.position}}</p>
              </div>
              <div class="container v-hidden" id="action">
                <div class="float-end">
                  <RouterLink :to="{ name: 'employee', params: { id: emp.id }}" class="text-secondary" id="edit"> <!--passing the id to the url as an object-->
                    <i class="fa-solid fa-eye"></i>
                  </RouterLink> 
                </div>
              </div>
            </div>

            
          </div>

      </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Add new employee</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="form-floating mb-3">
        <input v-model="firstname" type="text" class="form-control" id="floatingInput" placeholder="text" required>
        <label for="floatingInput">First Name</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="lastname" type="text" class="form-control" id="floatingInput" placeholder="text">
        <label for="floatingInput">Last Name</label>
      </div>
      <div class="form-floating mb-3">
        <select v-model="gender" class="form-select" id="floatingSelect" aria-label="Floating label select example">
          <!-- <option selected>Open this select menu</option> -->
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label for="floatingSelect">Gender</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="contactNo" type="text" class="form-control" id="floatingInput" placeholder="text">
        <label for="floatingInput">Contact Number</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="position" type="text" class="form-control" id="floatingInput" placeholder="text">
        <label for="floatingInput">Position</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-success" @click="addEmployee()">Add Employee</button>
    </div>
  </div>
</div>
</div>
<RouterView />
</template>

<style>
  #employee:hover, #addEmp:hover {
    background-color: rgba(0, 0, 0, 0.041);
  }
  #employee:hover #action {
    visibility: visible !important;
  }
  .v-hidden {
    visibility: hidden !important;
  } 

  #edit:hover {
    opacity: 0.7;
  }
</style>