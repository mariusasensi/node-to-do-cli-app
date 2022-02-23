require('colors');
const {inquirerMenu, pause, readInput, readTaskToRemove, confirm, getTasksAsChecklist} = require('./helpers/inquirer');
const TaskManager = require('./models/taskManager');
const {save, read} = require('./helpers/repository');

const main = async() => {
    
    let opt;
    const taskManager = new TaskManager(read());

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case 1: 
                const desc = await readInput('Description of your task:');
                taskManager.makeTask(desc);
            break;
            case 2:
                taskManager.printTaskList(taskManager.listAsArray);
            break;
            case 3:
                taskManager.printCompletedTasks();
            break;
            case 4:
                taskManager.printPendingTasks();
            break;
            case 5:
                const tasks = taskManager.getTasksByCompleteStatus(taskManager.PENDING_TASK);
                if (!tasks.length) {
                    console.log('You have no pending tasks!');
                } else {
                    const ids = await getTasksAsChecklist(tasks);
                    if (ids.length) {
                        taskManager.completeBatch(ids);
                        console.log('Completed task(s)!');
                    }
                }
            break;
            case 6:
                const id = await readTaskToRemove(taskManager.listAsArray);
                if (id !== 0) {
                    const ok = await confirm('Are you sure?');
                    if (ok) {
                        taskManager.deleteTask(id);
                        console.log('Task deleted!');
                    }
                }
            break;
        }

        save(taskManager.listAsArray);
        
        await pause();
    } while(opt !== 0)
}

main();