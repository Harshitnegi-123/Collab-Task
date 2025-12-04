import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
//create a new project
router.post("/", protect, async (req, res) => {
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json({error: "Please provide all the fields.."});
        }
        const newProject =  new Project({
            name, 
            description,
            owner: req.user._id,
            members: [req.user._id], //creator is the first member 
        })
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Server error"});
    }
})
//get all projects for the logges in user
router.get("/", protect, async (req, res)=>{
    try{
        const projects = await Project.find({members: req.user._id}).sort({createdAt:-1}); //sorting by latest.
        res.status(200).json(projects);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "server error"});
    }
});
export default router;