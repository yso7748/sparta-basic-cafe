var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/stats', function (req, res, next) {
    res.status(200).json({
        stats: {
            totalMenus: 3,
            totalOrders: 10,
            totalSales: 30000
        }
    })
});
router.get('/', function (req, res, next) {
    res.status(200).json({
        menus: [
            {
                id: 1,
                name: 'Latte',
                type: 'Coffee',
                temperature: 'hot',
                price: 4500,
                totalOrders: 5
            },
            {
                id: 2,
                name: 'Iced Tea',
                type: 'Tea',
                temperature: 'ice',
                price: 3000,
                totalOrders: 10
            }
        ]
    })
});

module.exports = router;
