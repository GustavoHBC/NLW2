import Knex from 'knex';

// método up - alterações que queremos realizar na db
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    })
}

// método down - se deu merda, é oq rola
export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}