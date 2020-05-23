const express = require("express")
const auth = require("../middleware/auth")
const CustomerData = require("../models/customerdata")
const router = express.Router()

router.post('/custdata', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
    const custdata = new CustomerData({
        ...req.body,
        ip
    })

    try {
        await custdata.save()
        res.status(201).send(custdata)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/custdata', auth, async (req, res) => {
    try {
        const custdata = await CustomerData.find()
        if (!custdata) {
            return res.status(404).send()
        }
        res.send(custdata)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/custdata/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const custdata = await CustomerData.findOne({ _id })
        if (!custdata) {
            return res.status(404).send()
        }
        res.send(custdata)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/custdata/:id', auth, async (req, res) => {
    try {
        const custdata = await CustomerData.findOneAndDelete({ _id: req.params.id })
        if (!custdata) {
            return res.status(404).send()
        }
        res.send(custdata)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router