const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you need to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Create a new task`
            },
            {
                value: 2,
                name: `${'2.'.green} List task(s)`
            },
            {
                value: 3,
                name: `${'3.'.green} List complete task(s)`
            },
            {
                value: 4,
                name: `${'4.'.green} List pending task(s)`
            },
            {
                value: 5,
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value: 6,
                name: `${'6.'.green} Remove a task`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit`
            }
        ]
    }
];

const pauseInput = [
    {
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green} to continue`
    }
];

const readTaskToRemove = async(tasks) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${((i + 1) + '.').green} ${task.description}`
        }
    });

    choices.unshift({
        value: 0,
        name: `${'0.'.green} CANCEL`
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Which task do you want to delete?',
            choices
        }
    ];

    const {id} = await inquirer.prompt(question);
    
    return id;
}

const getTasksAsChecklist = async(tasks) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${((i + 1) + '.').green} ${task.description}`,
            checked: task.completedAt === null
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(question);
    
    return ids;
}

const inquirerMenu = async() => {
    console.clear();
    console.log('==============================='.green);
    console.log('        NODE TO-DO APP         '.white)
    console.log('===============================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;
}

const pause = async() => {
    console.log('\n');
    await inquirer.prompt(pauseInput);
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate: (desc) => {
                if (!desc || desc.trim() === '') {
                    return 'Please insert a valid value';
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc.trim();
}

module.exports = {
    inquirerMenu, 
    pause, 
    readInput, 
    readTaskToRemove, 
    confirm, 
    getTasksAsChecklist
}