import Knex from 'knex';

// método up - alterações que queremos realizar na db
export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    })
}

// método down - se deu merda, é oq rola
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}