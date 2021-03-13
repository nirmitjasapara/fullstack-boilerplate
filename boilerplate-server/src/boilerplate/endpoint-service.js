// Replace t with actual table name.
const EndpointService = {
    getAll(knex) {
      return knex.select('*').from('t')
    },
  
    insert(knex, newData) {
      return knex
        .insert(newData)
        .into('t')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('t')
        .select('*')
        .where('id', id)
        .first()
    },
  
    delete(knex, id) {
      return knex('t')
        .where({ id })
        .delete()
    }
  }
  
  module.exports = EndpointService