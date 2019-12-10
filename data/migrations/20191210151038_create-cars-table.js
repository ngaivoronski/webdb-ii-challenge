// change to make
exports.up = function(knex) {
    return knex.schema.createTable('cars', cars => {
        cars.increments();
        cars.string('VIN', 128)
            .unique()
            .notNullable()
        cars.string('make', 256)
            .notNullable()
        cars.string('model', 256)
            .notNullable()
        cars.float("milage")
            .notNullable()
        cars.string('transmissiontype', 128)
            .defaultTo('unknown');
        cars.string('status', 128)
            .defaultTo('unknown');
        

    })
};


// undo change
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
