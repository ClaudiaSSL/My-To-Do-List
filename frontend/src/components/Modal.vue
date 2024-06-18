<template>
  <Transition name="modal-fade">
    <div v-if="show" class="modal-wrapper">
      <div class="inner"> 
        <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <i class="fa-regular fa-circle-xmark" @click="handleCancel"></i>
        </div>
        <div   class="modal-body"> 
            <div class="modal-body"> 
                <form>
                  <div class="mb-3">
                      <label for="editTaskDescription" class="form-label">Description:</label>
                      <input
                      type="text"
                      class="form-control"
                      id="editTaskDescription"
                      v-model="addTaskForm.task_description"
                      placeholder="What is the task">
                  </div>
                  <div class="mb-3">
                      <label for="editTaskFor" class="form-label">For:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="editTaskFor"
                        v-model="addTaskForm.task_for"
                        placeholder="Enter for what task is. For example: Home">
                  </div>
                  <div class="mb-3 form-check">
                      <input
                      type="checkbox"
                      class="form-check-input"
                      id="editTaskDone"
                      v-model="addTaskForm.task_done">
                      <label class="form-check-label" for="editTaskDone">Done?</label>
                  </div>
                  <div class="buttons">
                    <div class="btn-group" role="group">
                        <b-button :pressed="false" @click="handleEditSubmit" variant="success">Submit</b-button>
                        <b-button :pressed="false" @click="handleCancel" variant="secondary">Cancel</b-button> 
                    </div>
                  </div>
                </form>
            </div>
          </div>  
        </div>
    </div>
  </Transition>
</template>
  
  <script  >
  
  export default {
    data(){
      return {
        addTaskForm: {
          task_id:'',
          task_description: '',
          task_for: '',
          task_done: false,
        },
      } 
    },
    
    props : ['task', 'show', 'title'],
    
    methods:{

      handleEditSubmit() {
        this.$emit('submit', this.addTaskForm)
        this.formInit()
        
       },

       handleCancel(){
          this.$emit('cancel')
          this.formInit()
       },
       
       formInit(){
          this.addTaskForm.task_id = "",
          this.addTaskForm.task_description = "",
          this.addTaskForm.task_for = "",
          this.addTaskForm.task_done = "" 
       }
  },
  created(){
    console.log(this.task, 'task edit')
    if(this.task){
      this.addTaskForm.task_id = this.task.id,
      this.addTaskForm.task_description = this.task.description,
      this.addTaskForm.task_for = this.task.for,
      this.addTaskForm.task_done = this.task.done 
    }
  }
}
   
</script>
  
<style scoped>
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}
.buttons{
  text-align: right;
  padding-right:1rem;
}
.inner {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  position: relative;
  min-width: 30%;
}

.inner > h2 {
  font-size: 3rem;
  font-weight: bold;
}

.inner > p {
  font-size: 1.8rem;
  font-weight: 300;
}

button {
  position: absolute;
  top: 3%;
  right: 2%;
  cursor: pointer;
  border-radius:  5px !important;
}
.form-check-input {
  position: absolute;
  margin-left: -2px;
  display: inline-block;
  margin-top: 1%;
}
.btn{
  margin-right: 10%;
}
i{
  text-align: right;
}
.modal-title{
  font-size: 30px;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.25s ease all;
}
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;

  z-index: 500;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);

  display: grid;
  place-items: center;
}
  </style>