const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: 2,
                name: `${'2.'.green} Listar tarea(s)`
            },
            {
                value: 3,
                name: `${'3.'.green} Listar tarea(s) completadas`
            },
            {
                value: 4,
                name: `${'4.'.green} Listar tarea(s) pendientes`
            },
            {
                value: 5,
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: 6,
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const pauseInput = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }
];

const listadoTareasBorrar = async(tareas) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${(idx + '.').green} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: 0,
        name: `${'0.'.green} CANCELAR`
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Qué tarea quieres borrar?',
            choices
        }
    ];

    const {id} = await inquirer.prompt(question);
    
    return id;
}

const listarTareasChecklist = async(tareas) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`;

        return {
            value: tarea.id,
            name: `${(idx + '.').green} ${tarea.desc}`,
            checked: tarea.completadoEn === null
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(question);
    
    return ids;
}

const inquirerMenu = async() => {
    console.clear();
    console.log('==============================='.green);
    console.log('   Seleccione una opción   '.white)
    console.log('===============================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;
}

const pause = async() => {
    console.log('\n');
    await inquirer.prompt(pauseInput);
}

const confirmar = async(message) => {
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

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            valdate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;
}

module.exports = {inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar, listarTareasChecklist}