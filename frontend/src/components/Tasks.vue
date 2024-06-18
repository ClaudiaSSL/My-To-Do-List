<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 >My To Do List</h1>
        <alert :message="store_tasks.message" v-if="store_tasks.showMessage"></alert>
        <div style="height: 80px;"></div>
        <div class="content">
          <button type="button"
              class="btn btn-success btn-sm"
              @click="show_modal = true" 
              >
              Add task
          </button>

          <modal @submit="submitAdd"   :show="show_modal" @cancel="handleModalCancel" :title="'Add Task'"/>
          <div v-if="selected_task">
            <modal @submit="submitEdit"   :show="show_modal" @cancel="handleModalCancel" :title="'Update Task'" :task="selected_task"/>
          </div>
         
          
          <div style="overflow-x:auto;">
            <table class="table table-hover">
            <thead>
              <tr>
                <th style="width:40%" >Description</th>
                <th>For</th>
                <th >Done?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in tasks" :key="index">
                <td >{{ task.description }}</td>
                <td >{{ task.for }}</td>
                <td>
                  <span v-if="task.done">Yes</span>
                  <span v-else>No</span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                      <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          @click="openEditModal(task)">
                          Update
                         
                      </button>
                      <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="store_tasks.removeTask(task.id)">
                          Delete
                      </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>

import Alert from './Alert.vue';
import Modal from "./Modal.vue";
import { tasksStore } from "../stores/store";
import { mapActions , mapState} from 'pinia';

export default {
  
  data() {
    return {
      store_tasks: tasksStore(),
      selected_task:null,
      show_modal:false,
    }
  },
  components: {
    alert: Alert,
    modal:Modal,
  },
  computed:{
    ...mapState(tasksStore, ['tasks'])
  },
  
  methods: {
    ...mapActions(tasksStore, ['getTasks']),

    handleModalCancel(){
      this.show_modal = false
      this.selected_task = null
    },

    submitAdd(task){
      let payload={
        description:task.task_description,
        for:task.task_for,
        done:task.task_done
      }
      this.store_tasks.addTask(payload)
      this.show_modal=false
    },
    submitEdit(task){
      let payload={
          description:task.task_description,
          for:task.task_for,
          done:task.task_done
        }
      this.store_tasks.updateTask(payload, task.task_id)
      this.handleModalCancel()
    },

    openEditModal(task){
      this.selected_task=task
      this.show_modal = true
    },
  },
  created() {
      this.store_tasks.getTasks()
  }
};
</script>

<style scoped>
table{ 
    table-layout: fixed; 
    width: 90%; 
    margin-top: 2%;
} 
td{ 
    padding: 5px; 
    overflow: auto; 
    word-break: break-all;
} 
button{
    font-size: large;
}
@media screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

	table, thead, tbody, th, td, tr { 
		display: block; 
	}
	
	thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
	
	tr { 
    border: 1px solid #ccc; 
  }
	
	td { 
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 50% !important; 
	}
	
	td:before { 
		position: absolute;
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
	
	/*
	Label the data
	*/
	td:nth-of-type(1):before { content: "Description"; }
	td:nth-of-type(2):before { content: "About"; }
	td:nth-of-type(3):before { content: "Done"; }
	td:nth-of-type(4):before { content: "Action"; }

}
button{
  margin-right: 1rem;
  border-radius: 5px !important;
}


</style>
