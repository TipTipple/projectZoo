const router = require('express').Router();
const { week, day } = require('../models/price');

router.get('/', async (req, res) => {
  const priceWeek = await PricesWeek.find();
  const priceDay = await PricesDay.find();
  const arr = priceWeek[priceWeek.length - 1];
  res.render('price', {
    price_ch_w: arr[0].priceChild,
    price_ad_w: arr[1].priceAdult,
  });
});

router.post('/add', async (req, res) => {
  console.log(req.body);
  const { select_ch, priceChild, priceAdult } = req.body;
  console.log(typeof select_ch);

  if (select_ch) {
    // Будни
    const price = await day.create({
      priceChild,
      priceAdult,
    });
    res.json(price);
  } else {
    // Праздники
    const price = await week.create({
      priceChild,
      priceAdult,
    });
    res.json(price);
  }
});

module.exports = router;
