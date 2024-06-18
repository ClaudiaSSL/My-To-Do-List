import { defineStore } from 'pinia'
import axios from 'axios';


export const tasksStore = defineStore("tasks-store", {
  state: () => ({
        tasks: [],
        message: '',
        showMessage: false
    }),
  actions: {
    addTask(payload) {
        const path = 'http://localhost:5001/tasks';
        axios.post(path, payload)
          .then((res) => {
            let task = {
              id:res.data.id,
              description : payload.description,
              for : payload.for,
              done : payload.done
            }
            this.tasks.push(task)
            this.message = 'Task added!';
            this.showMessage = true;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      updateTask(payload, taskID) {
        const path = `http://localhost:5001/tasks/${taskID}`;
        axios.put(path, payload)
            .then(() => {
              const task = this.tasks.find(obj => obj.id === taskID);
              const i = this.tasks.indexOf(task)
              this.tasks[i].description=payload.description
              this.tasks[i].done=payload.done
              this.tasks[i].for=payload.for
              this.message = 'Task updated!';
              this.showMessage = true;
            })
            .catch((error) => {
              console.error(error);
            });
        },
        removeTask(taskID) {
          const path = `http://localhost:5001/tasks/${taskID}`;
          axios.delete(path)
              .then(() => {
                this.tasks = this.tasks.filter(item => item.id !== taskID);
                this.message = 'Task removed!';
                this.showMessage = true;
              })
              .catch((error) => {
                console.error(error);
              });
      },
      getTasks(){
          const path = 'http://localhost:5001/tasks';
          axios.get(path)
            .then((res) => {
              this.tasks=res.data.tasks
            })
            .catch((error) => {
              console.error(error);
            })     
    },
  },
  getters: {
    
  },
});