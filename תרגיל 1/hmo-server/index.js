// import express from "express";
// import { getMembers,getMember ,postMember} from "./database";
// const app=express();

// //בדיקת תקינות
// const validateMember = (member) => {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     const { error } = Joi.validate(member, schema);
    
//     return error;
// };

// app.get('/members',async(req,res)=>{
//     const data=await getMembers();
//     res.send(data);
// });

// app.get('/members/:id',async(req,res)=>{
//     const {id}=req.params;
//     const data=await getMember(id);
//     res.send(data);
// });

// app.post('/members', async(req, res) => {
//     const error = validateMember(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);
  
//     // const member = {
//     //     id: members[members.length - 1].id + 1,
//     //     name: req.body.name
//     // };

//     // members.push(member);

//     const {member_id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone}=req.body;
//     const member=await postMember(member_id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone);
//     res.status(201).send(member);
// });

// app.put('/:id',(req,res)=>{
//     const member=await getMember(req.params.id)
//     // const member = members.find((x) => x.id === parseInt(req.params.id));
//     if (!member) return  res.status(404).send('Member not found');

//     const error = validateMember(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);

//     member.name=req.body.name;
//     res.send(member)
// })

// app.listen(8080,()=>{
//     console.log('listen on port 8080');
// })


import express from "express";
import Joi from "joi"; // Import Joi for validation
import cors from "cors";
import { getMembers, getMember, postMember,putMember,deleteMember,getAllcovid_dataData } from "./database.js";

const app = express();
 app.use(cors());
 app.use(express.json());
// -----------------------------------------
// server/index.js
import path from 'path';



const corsOptions = {
    origin: 'http://localhost:5173', // המקור של הלקוח
    optionsSuccessStatus: 200 // קוד סטטוס להצלחה לתת חזרה ללקוח
  };
  
  app.use(cors(corsOptions));
  
// ----------------------------------------
// Define the validation schema
// const schema = {
//     name: Joi.string().min(3).required()
// };
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    // date_of_birth: Joi.date().max('now').required(),
    // building_num: Joi.number().positive().required(),
    // phone: Joi.string().length(9, 10).pattern(/^[0-9]+$/).required(),
    // mobile_phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});


// Validate member function
const validateMember = (member) => {
    const { error } = Joi.validate(member, schema);
    return error;
};

// GET all members
app.get('/members', async (req, res) => {
    const data = await getMembers();
    res.send(data);
});

// GET member by ID
app.get('/members/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getMember(id);
    res.send(data);
});

// POST a new member
app.post('/members', async (req, res) => {
    const error = validateMember(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const { member_id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone } = req.body;
    const member = await postMember(member_id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone);
    res.status(201).send(member);
});

// PUT update member by ID
// app.put('/members/:id', async (req, res) => {
//     const { id } = req.params;
//     const member = await getMember(id);
//     if (!member) return res.status(404).send('Member not found');

//     const error = validateMember(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);

//     member.name = req.body.name;
//     res.send(member);
// });


app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone } = req.body;

    try {
        const updatedMember = await putMember(id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone);
        res.send(updatedMember);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteMember(id);
        res.send({ id });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// GET all covid_dataData
app.get('/covid_data', async (req, res) => {
    const data = await getAllcovid_dataData();
    res.send(data);
});
// app.listen(8080, () => {
//     console.log('Listening on port 8080');
// });

const PORT=process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

console.log(await getMembers())