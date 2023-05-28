const router = require('express').Router();
const nudgeSchema = require('../modules/nudgeModule')

router.post('/nudgepost',async(req,res)=>{
    const newNudge = new nudgeSchema({
        event_id:req.body.event_id ,
        creator:req.body.creator ,
        title:req.body.title ,
        image:req.body.image ,
        description:req.body.description ,
        schedule:req.body.schedule ,
        icon:req.body.icon,
        oneLiner:req.body.oneLiner
    })

    try {
        const saveNudge = await newNudge.save();
        res.status(200).send(saveNudge);
    } catch (error) {
        res.status(422).send(error) 
    }  
})

router.get('/singlenudge/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const findNudge = await nudgeSchema.findById(id);
        res.status(200).send(findNudge);
    } catch (error) {
        res.status(422).send(error) 
    }
})

router.get('/nudgeevents',async(req,res)=>{
    try {
        const findNudges = await nudgeSchema.find();
        res.status(200).send(findNudges);
    } catch (error) {
        res.status(422).send(error) 
    }
})

router.put('/nudgeupdate/:id',async(req,res)=>{
    const {id} = req.params

    const checkNudge = await nudgeSchema.findById(id);
    if(!checkNudge) return res.status(400).send('no such nudge present')

    if (checkNudge.creator === req.body.creator) {
        try {
            const updateNudge = await nudgeSchema.findByIdAndUpdate(id,req.body,{new:true});
            res.status(200).send(updateNudge);
        } catch (error) {
            res.status(422).send(error)
        }
    } else {
        res.status(400).send("you cant update other's nudge")
    }
})

router.delete('/nudgedelete/:id',async(req,res)=>{
    const {id} = req.params

    const checkNudge = await nudgeSchema.findById(id);
    if(!checkNudge) return res.status(400).send('no such nudge present')

    if (checkNudge.creator === req.body.creator) {
        try {
            const deleteNudge = await nudgeSchema.findByIdAndDelete(id);
            res.status(200).send('nudge successfully deleted..');
        } catch (error) {
            res.status(422).send(error)
        }
    } else {
        res.status(400).send("you cant delete other's nudge")
    }
})

module.exports = router