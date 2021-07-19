const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const  members = require('./Members');

// get all members
router.get('/', (req, res) => res.json(members));

// get single members
router.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
            res.status(400).json({msg: `no member with the ID of ${req.params.id}`});
        }
});

// creating members
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        res.status(400).json({msg: 'please include a name and email'});

    }members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

//updating a member

router.put('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updateMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt( req.params.id)){
                member.name= updateMember.name? updateMember.name : member.name;
                member.email = updateMember.email? updateMember.email : member.email;
                res.json({msg: 'Member updated ', member});
            }
        });
    }else{
            res.status(400).json({msg: `no member with the ID of ${req.params.id}`});
        }
});

// Deleting a member
router.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({ msg: 'Member deleted', membes: members.filter(member => member.id !== parseInt(req.params.id))});
    }else{
            res.status(400).json({msg: `no member with the ID of ${req.params.id}`});
        }
});


module.exports = router; 