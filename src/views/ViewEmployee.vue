<script setup>
import { ref, onMounted, watch } from 'vue'
import { db } from '../firebase/firebase.js'
import { doc, getDoc, updateDoc, deleteDoc  } from 'firebase/firestore'
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

const empID = defineProps(['id'])
console.log(empID)

onMounted(async () => {
    
    const id = empID.id

    const docRef = doc(db, "employees", id)
    const docSnap = await getDoc(docRef)

    console.log(docSnap.data().lastname)
    lastname.value = docSnap.data().lastname
    firstname.value = docSnap.data().firstname
    gender.value = docSnap.data().gender
    contactNo.value = docSnap.data().contactNo
    position.value = docSnap.data().position
})

const lastname = ref('')
const firstname = ref('')
const gender = ref('')
const contactNo = ref('')
const position = ref('')

const updateEmployee = () => {
    updateDoc(doc(db, 'employees', empID.id), {
        firstname: firstname.value,
        lastname: lastname.value,
        gender: gender.value,
        contactNo: contactNo.value,
        position: position.value
    })
    
    router.push('/employees')

}

const deleteEmployee = () => {
  deleteDoc(doc(db, 'employees', empID.id))
  router.push('/employees')
}
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="container col-md-6">
                <h3 class="text-center mb-3"><i class="fa-solid fa-pen-to-square"></i> Edit Employee Info</h3>
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <RouterLink to="/employees" class="fs-5 text-decoration-none text-dark fw-bold me-2"> <i class="fa-solid fa-arrow-left"></i></RouterLink>
                        <p class="fs-5 mb-0">Go Back</p>
                    </div>
                    <div class="card-body">
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
                    <div class="card-footer">
                        <div class="float-end">
                            <a class="btn btn-danger me-3" id="delete" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa-solid fa-trash"></i> Delete</a>
                            <a class="btn btn-success" @click="updateEmployee()"> <i class="fa-solid fa-floppy-disk"></i> Update</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel"><i class="fa-solid fa-triangle-exclamation"></i> Delete Confirmation: </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="fw-normal">Are you sure you want to delete this employee "{{ firstname }} {{ lastname }}"?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteEmployee()">Delete Employee</button>
            </div>
          </div>
        </div>
      </div>
<RouterView />
</template>

<style>
    #header {
        width: 50% !important;
    }
</style>