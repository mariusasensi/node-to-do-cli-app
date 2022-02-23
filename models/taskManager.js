require('colors');
const Task = require('./task');

class TaskManager {
    _list = {};

    PENDING_TASK = 0;
    COMPLETE_TASK = 1;
    
    constructor(data) {
        if (data !== null) {
            data.forEach(task => {
                const newTask = new Task(task.description, task.id, task.completedAt);
                this._list[task.id] = newTask;
            });
        }
    }

    get listAsArray() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    getTasksByCompleteStatus(status) {
        let list = [];
        this.listAsArray.forEach(task => {
            if (
                (status === this.PENDING_TASK && task.completedAt === null) ||
                (status === this.COMPLETE_TASK && task.completedAt !== null)
            ) {
                list.push(task)
            }
        });

        return list;
    }

    printCompletedTasks() {
        const tasks = this.getTasksByCompleteStatus(this.COMPLETE_TASK);
        if (tasks !== []) {
            this.printTaskList(tasks);
        }
    }

    printPendingTasks() {
        const tasks = this.getTasksByCompleteStatus(this.PENDING_TASK);
        if (tasks !== []) {
            this.printTaskList(tasks);
        }
    }

    makeTask(description) {
        const task = new Task(description);
        this._list[task.id] = task;

        return true;
    }

    deleteTask(id) {
        if (this._list[id]) {
            delete this._list[id];

            return true;
        }

        return false;
    }

    completeTask(id) {
        const task = this._list[id];
        if (task) {
            task.completedAt = new Date().toISOString();

            return true;
        }

        return false;
    }

    completeBatch(ids) {
       ids.forEach(id => {
           this.completeTask(id);
       });

       return true;
    }

    printTaskList(tasks) {
        tasks.forEach((task, i) => {
            const completeAt = task.completedAt;
            console.log(`${((i+1) + '.').green} ${task.description} :: ${completeAt !== null ? completeAt.green : 'Pending'.red }`)
        });
    }
}

module.exports = TaskManager;