const {v4: uuidv4} = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc, id = null, completadoEn = null) {
        this.id = id !== null ? id : uuidv4();
        this.desc = desc;
        this.completadoEn = completadoEn;
    }
}

module.exports = Tarea;