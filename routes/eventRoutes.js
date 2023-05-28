const router = require('express').Router();
const eventSchema = require('../modules/eventsModule')

router.post('/eventpost', async (req, res) => {
    const newEvent = new eventSchema({
        type: req.body.type,
        uid: req.body.uid,
        name: req.body.name,
        tagline: req.body.tagline,
        schedule: req.body.schedule,
        description: req.body.description,
        files: req.body.files,
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: req.body.rigor_rank,
        attendees: req.body.attendees
    })

    try {
        const saveEvent = await newEvent.save();
        res.status(200).send(saveEvent)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.get('/eventget',async(req,res)=>{
    try {
        const showEvents = await eventSchema.find();
        res.status(200).send(showEvents)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.get('/pagination',async(req,res)=>{

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    let skip = (page-1) * limit;

    try {
        const findEvents = await eventSchema.find().sort({schedule:1}).skip(skip).limit(limit)
        res.status(200).send(findEvents);
    } catch (error) {
        res.status(422).send(error)
    }
})

router.get('/eventone/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const findEvent = await eventSchema.findById(id);
        res.status(200).send(findEvent);
    } catch (error) {
        res.status(422).send(error)
    }
})

router.put('/eventupdate/:id',async(req,res)=>{
    const {id} = req.params

    const checkUser = await eventSchema.findById(id);
    if(!checkUser) return res.status(400).send('no such event present')

    if (checkUser.uid === req.body.uid) {
        try {
            const updateEvent = await eventSchema.findByIdAndUpdate(id,req.body,{new:true});
            res.status(200).send(updateEvent);
        } catch (error) {
            res.status(422).send(error)
        }
    } else {
        res.status(400).send("you cant update other's event")
    }
})

router.delete('/eventdelete/:id',async(req,res)=>{
    const {id} = req.params

    const checkUser = await eventSchema.findById(id);
    if(!checkUser) return res.status(400).send('no such event present')

    if (checkUser.uid === req.body.uid) {
        try {
            await eventSchema.findByIdAndDelete(id);
            res.status(200).send('event deleted successfully..');
        } catch (error) {
            res.status(422).send(error)
        }
    } else {
        res.status(400).send("you cant delete other's event")
    }
})

module.exports = router;