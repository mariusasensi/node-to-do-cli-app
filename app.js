require('colors');
const {inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar, listarTareasChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {save, read} = require('./helpers/repository');

const main = async() => {
    
    let opt;
    const tareas = new Tareas(read());

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case 1: 
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            case 2:
                tareas.printTaskList(tareas.listarArr);
            break;
            case 3:
                tareas.printCompletedTasks();
            break;
            case 4:
                tareas.printPendingTasks();
            break;
            case 5:
                const tasks = tareas.getTasksByCompleteStatus(tareas.PENDING);
                if (!tasks.length) {
                    console.log('No hay tareas pendientes!');
                } else {
                    const ids = await listarTareasChecklist(tasks);
                    if (ids.length) {
                        tareas.completar(ids);
                        console.log('Tarea(s) completadas!');
                    }
                }
            break;
            case 6:
                const id = await listadoTareasBorrar(tareas.listarArr);
                if (id !== 0) {
                    const ok = await confirmar('Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada!');
                    }
                }
            break;
        }

        save(tareas.listarArr);
        
        await pause();
    } while(opt !== 0)
}

main();