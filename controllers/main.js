const nodemailer = require("nodemailer");
require('dotenv').config();
const Job = require('../models/Job');

const test = async (req, res) => {
    
    try {
        const date = new Date();
        const { name, email, day, hour, min, second, month, status, token, cstart } = req.body;

        const deff = await Job.findOne({ email: email.mail });
        try {
            if (deff) {

            }
            else {

                const dda = await Job.create({
                    name: name.name,
                    email: email.mail,
                    token: token.token,
                    id: `${Math.random()}`
                })
            }
        } catch (error) {
            console.log(error)

        }
        try {
            const dde = await Job.updateOne(
                { email: email.mail },
                {
                    $push:
                    {
                        starttime: date,
                        endtime: date,
                        day: day,
                        hour: hour,
                        min: min,
                        second: second,
                        month: month,
                        status: status
                    }
                }
            );
        }
        catch (error) {
            res.status(404).json({ "err": error })
        }
        await Job.findOne({ email: email.mail }).then((rest, err) => {
            if (rest) {
                res.status(201).send(rest)
            }
            else {
                res.status(404).send(err)
            }
        })
    }
    catch (err) {
        res.status(404).json({ error: err })
    }
}

const getdata = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await Job.findOne({ email: email })
        const arr = data.starttime
        res.status(201).json({ arrey: arr })
    }
    catch (err) {
        res.status(404).json({ "err": err })
    }
}

const send = async (req, res) => {
    const { email, est1, est2, in1, in2 } = req.body
    try {
        var arr = [];
        const data = await Job.findOne({ email: email })
        data.status = [true, false, false, false]
        for (let i = 0; i < in1; i++) {
            arr.push(data.starttime[i])
        }
        for (let i = in2 + 1; i < data.starttime.length; i++) {
            arr.push(data.starttime[i])
        }
        data.starttime = arr
        await data.save()
        res.status(201).json({ "succ": "success" })
    }
    catch (err) {
        res.status(404).json({ error: err })
    }
}
const change = async (req, res) => {
    const { i, j, start, end, in1, in2, email } = req.body;
    try {
        var data = await Job.findOne({ email: email });
        var arr = [];
        for (let k = 0; k < i; k++) {
            arr.push(data.starttime[i])
        }
        arr.push(new Date(start))
        arr.push(new Date(end))
        for (let k = j + 1; k < data.starttime.length; k++) {
            arr.push(data.starttime[k])
        }
        data.starttime = arr
        await data.save();
        res.status(201).json({ "data": "data" })
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ error: err })
    }
}


module.exports = { test, send, getdata, change };