import Knex from 'knex';

// método up - alterações que queremos realizar na db
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}

// método down - se deu merda, é oq rola
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}