import { Router } from 'express';
const router = Router();
import User from '../models/user.js'
import { hashPassword, comparePassword, compareString } from '../utils/helper.js';



router.get('/login', async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return res.send({
            message: 'Missing credentials',
            status: 400
        })
    }

    const searchUser = await User.findOne({ email })
    const compare_role = compareString(role, searchUser.role)
    const compare_password = comparePassword(password, searchUser.password)

    if (compare_role && compare_password) {
        console.log('Logged in')
        req.session.user = searchUser
        return res.sendStatus(200)
    } else {
        res.send({
            message: 'credentials does not match',
            status : 400
        })
    }
});


router.post('/register', async (req, res) => {
    const { email, role, fname, lname } = req.body

    const searchUser = await User.findOne({ email })
    if (searchUser) {
        res.status(400).send({ msg: 'User already exists' })
    } else {
        const password = hashPassword(req.body.password)
        const newUser = User.create({ email, password, role, fname, lname })
        res.sendStatus(201)
    }
})

export default router;
