
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '1FAFP34P5YW247866', make: 'MERCEDES-BENZ', model: 'B ELECTRIC DRIVE', milage: 10000, transmissiontype: 'Automatic', status: 'clean'},
        {VIN: '5XYKT4A22BG109547', make: 'ACURA', model: 'MDX', milage: 100000, transmissiontype: 'automatic', status: 'used'},
        {VIN: '1FTSW31PX4EA46237', make: 'ACURA', model: 'RL', milage: 15000, transmissiontype: 'automatic'},
        {VIN: '3D7KS29C97G700977', make: 'TOYOTA', model: 'SIENNA', milage: 30000, status: 'used'},
        {VIN: '1N4BL2AP2CN502190', make: 'CHEVROLET', model: 'TRAVERSE', milage: 25000},
      ]);
    });
};
