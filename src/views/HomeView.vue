<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/firebase.js'
import { collection, deleteDoc, addDoc, onSnapshot, doc, getDoc, query, orderBy } from 'firebase/firestore'
import { RouterLink, RouterView } from 'vue-router'

onMounted(() => {
  onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
    let tasksTmp = []
    querySnapshot.forEach((doc) => { 
      const task = {
        id: doc.id,
        task: doc.data().task,
        endDate: new Date(Date.parse(doc.data().endDate)).toDateString(),
        status: doc.data().status,
        assignee: doc.data().assignee,
      }
      tasksTmp.push(task)
    })

    tasks.value = tasksTmp 
  })
  
  // const q = query(collection(db, 'tasks'), orderBy('uid')); //fetch data from firestore with query clause
  
  // onSnapshot(q, (querySnapshot) => {
  //   let tasksTmp = []
  //   querySnapshot.forEach((doc) => {
  //     const task = {
  //       id: doc.id,
  //       // uid: doc.data().uid,
  //       task: doc.data().task,
  //       endDate: new Date(Date.parse(doc.data().endDate)).toDateString(),
  //       status: doc.data().status,
  //       assignee: doc.data().assignee,
  //     }
      
  //     tasksTmp.push(task)
  //   })

  //   tasks.value = tasksTmp
  // })
})

const tasks = ref([])

const task = ref('')
const endDate = ref('')
const status = ref('')
const assignee = ref('')

const addTask = () => {
  if (task.value != '' && endDate.value != '' && status.value != '' && assignee.value != '') {
    
    const newTask = {
      task: task.value,
      endDate: endDate.value,
      status: status.value,
      assignee: assignee.value
    }
    addDoc(collection(db, "tasks"),newTask)
    task.value = ''
    endDate.value = ''
    status.value = ''
    assignee.value = ''
  }
}

const compareStrings = (status) => {
    const str1 = 'Not Started'
    const str2 = 'In Progress'
    const str3 = 'Finished'
    const str4 = 'Cancelled'

    if(status == str1){
      return 'bg-secondary'
    }else if(status == str2){
      return 'bg-info'
    }else if(status == str3){
      return 'bg-success'
    }else if(status == str4){
      return 'bg-danger'
    }
}

</script>

<template>
  <div class="container mt-3">
      <div class="row">
        <div class="container d-flex justify-content-between">
          <h3>Task Board</h3>
        </div>
        <div class="container col-md-12">
            <div class="container d-flex align-items-center p-3">
              <p class="w-75 mb-0 fw-semibold">Task</p>
              <div class="container d-flex justify-content-between">

                <div class="container text-center">
                  <p class="mb-0 fw-semibold">End Date</p>
                </div>
                <div class="container text-center">
                  <p class="mb-0 fw-semibold">Status</p>
                </div>
                <div class="container text-start">
                  <p class="mb-0 fw-semibold">Assignees</p>
                </div>
                <div class="container text-end">
                  <p class="mb-0 fw-semibold">...</p>
                </div>
              </div>
            </div>
            <div class="container p-3 border rounded mb-1 shadow-sm" id="addTask"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              >
              <p class="mb-0 fw-semibold"><i class="fa-solid fa-bars-progress"></i>&nbsp; Add New Task</p>
            </div>
              
            <div v-for="item in tasks" :key="item.task" class="container d-flex align-items-center p-3 border rounded mb-1 shadow-sm" id="task" >
              <p class="w-75 mb-0 fw-semibold">{{item.task}}</p>
              <div  class="container d-flex justify-content-between">
                <div class="container text-center">
                  <p class="mb-0 fw-normal">{{item.endDate}}</p>
                </div>
                <div class="container text-center">
                  <span class="badge" :class="compareStrings(item.status)">{{item.status}}</span>
                </div>
                <div class="container text-start">
                  <p class="mb-0 fw-normal">{{item.assignee}}</p>
                </div>
                <div class="container v-hidden" id="action">
                  <div class="float-end">
                    <RouterLink :to="{ name: 'edit', params: { id: item.id }}" class="text-secondary" id="edit"> <!-- passing the id to the url as an object -->
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
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add new task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-floating mb-3">
          <input v-model="task" type="text" class="form-control" id="floatingInput" placeholder="text" required>
          <label for="floatingInput">What is the task?</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="endDate" type="date" class="form-control" id="floatingInput" placeholder="text">
          <label for="floatingInput">End Date</label>
        </div>
        <div class="form-floating mb-3">
          <select v-model="status" class="form-select" id="floatingSelect" aria-label="Floating label select example">
            <!-- <option selected>Open this select menu</option> -->
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Finished">Finished</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <label for="floatingSelect">Status</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="assignee" type="text" class="form-control" id="floatingInput" placeholder="text">
          <label for="floatingInput">Assignee(s)</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" @click="addTask()">+&nbsp;Add Task</button>
      </div>
    </div>
  </div>
</div>
<RouterView />
</template>

<style>
  #task:hover, #addTask:hover {
    background-color: rgba(0, 0, 0, 0.041);
  }
  #task:hover #action {
    visibility: visible !important;
  }
  .v-hidden {
    visibility: hidden !important;
  } 

  #edit:hover {
    opacity: 0.7;
  }
</style>