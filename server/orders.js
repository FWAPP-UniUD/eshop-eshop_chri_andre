import jwt from 'express-jwt';
import { Router } from 'express';
import Order from './models/order';
import User from './models/user';
import config from './config';

const router = Router();

router.use(jwt({ secret: config.secret_key }));
// middleware to get limit and page for paging
router.use('/', function(req, res, next) {
    req.limit = req.query.limit || 3;
    req.page = req.query.page || 1;
    next();
});

router.get('/', function(req, res, next) {
    const data = req.body;
    console.log(data);

});

router.post('/', function(req, res, next) {
    const data = req.body;
    console.log(data);
});

export default router;