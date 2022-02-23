require('colors');
const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    PENDING = 0;
    COMPLETE = 1;
    
    constructor(data) {
        if (data !== null) {
            data.forEach(task => {
                const tarea = new Tarea(task.desc, task.id, task.completadoEn);

                this._listado[tarea.id] = tarea;
            });
        }
    }

    get listarArr() {
        const list = [];
        Object.keys(this._listado).forEach(key => {
            list.push(this._listado[key]);
        });

        return list;
    }

    getTasksByCompleteStatus(status) {
        let completes = [];
        this.listarArr.forEach(task => {
            if (
                (status === this.PENDING && task.completadoEn === null) ||
                (status === this.COMPLETE && task.completadoEn !== null)
            ) {
                completes.push(task)
            }
        });

        return completes;
    }

    printCompletedTasks() {
        const tasks = this.getTasksByCompleteStatus(this.COMPLETE);
        if (tasks !== []) {
            this.printTaskList(tasks);
        }
    }

    printPendingTasks() {
        const tasks = this.getTasksByCompleteStatus(this.PENDING);
        if (tasks !== []) {
            this.printTaskList(tasks);
        }
    }

    crearTarea(desc) {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    completarTarea(id) {
        const tarea = this._listado[id];
        if (tarea) {
            tarea.completadoEn = new Date().toISOString();
        }
    }

    completar(ids) {
       ids.forEach(id => {
           this.completarTarea(id);
       }) 
    }

    printTaskList(tasks) {
        tasks.forEach((task, i) => {
            const completeAt = task.completadoEn;
            console.log(`${((i+1) + '.').green} ${task.desc} :: ${completeAt !== null ? completeAt.green : 'Pendiente'.red }`)
        });
    }
}

module.exports = Tareas;