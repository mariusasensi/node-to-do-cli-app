const {v4: uuidv4} = require('uuid');

class Task {
    id = '';
    description = '';
    createdAt = null;
    completedAt = null;

    constructor(description, id = null, completedAt = null, createdAt = null) {
        this.id = id !== null ? id : uuidv4();
        this.description = description;
        this.completedAt = completedAt;
        this.createdAt = createdAt ? createdAt : new Date().toISOString();
    }
}

module.exports = Task;