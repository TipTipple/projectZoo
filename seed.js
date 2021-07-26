const Animal = require('./models/Animal')
const User = require('./models/User')
const mongoose = require('mongoose');

mongoose.pluralize(null)

mongoose.connect('mongodb://localhost:27017/Animal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Connection to databse is successful.');
});

// const newAnimal = new Animal({
//   title: 'Hameleon',
//   info: `Хамелеон — одна из самых необычных и красивых ящериц на планете.Средняя длина хамелеона составляет около 30
//   см, самые крупные хамелеоны вырастают до 65-68 см, размер самых маленьких ящериц не превышает 3-5 см.Например,
//   длина самца ящерицы Brookesia micra вместе с хвостом составляет 2, 2-2, 3 см, а общая длина гигантского хамелеона
//   Furcifer oustaleti составляет 50-68 см.`,
//   image: ['6728815cd7397e71fec8dda79879e375.jpg', '1-13.jpg']
// })

// newAnimal.save();

// const newUser = new User({
//   name: 'Timur',
//   email: 'timur-popovich@outlook.com',
//   info: `Весёлый парень что тут ещё сказать)`,
// })

// newUser.save();
