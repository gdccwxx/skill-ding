const db = require('./database');
async function createQuestion ({ name, length, A, B, C, D, E, F, answer }) {
    const createQuestion = `insert into question_list(name, length, A, B, C, D, E, F, answer) values(?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const createQuestionValue = [name, length, A, B, C, D, E, F, answer];
    let result = await db.query_async({
        sql: createQuestion,
        values: createQuestionValue
    }).then(response => {
        return {
            ret: 0,
            item: response
        }
    }).catch(error => {
        return {
            ret: 1,
            info: JSON.stringify(error)
        };
    });
    return result;
}

async function deleteQuestion ({id}) {
    let result = await db.query_async({
        sql: `delete from question_list where id = ${id};`
    }).then(response => {
        return {
            ret: 0,
            item: response
        };
    }).catch(error => {
        return {
            ret: 1,
            info: JSON.stringify(error)
        };
    })
    return result;
}

async function queryQuestion ({id}) {
    let sql = 'select * from question_list';
    if (typeof id === 'number') {
        sql += ` where id = '${id}'`;
    }
    let result = await db.query_async({
        sql
    }).then(response => {
        return {
            ret: 0,
            item: response.result
        }
    }).catch(error => {
        return {
            ret: 1,
            error: JSON.stringify(error)
        }
    })
    return result;
}

async function updateQuestion ({id, name, length, A, B, C, D, E, F, anwer}) {
    let result = await db.query_async({
        sql: `UPDATE question_list SET name = '${name}', length='${length}', A='${A}', B='${B}', C='${C}', D='${D}', E='${E}', F='${F}', answer = '${anwer}' where id = ${id}`
    }).then(response => {
        return {
            ret: 0,
            item: response.result
        }
    }).catch(error => {
        return {
            ret: 1,
            error: JSON.stringify(error)
        }
    })
    return result
}
module.exports = {
    createQuestion,
    deleteQuestion,
    queryQuestion,
    updateQuestion
};
