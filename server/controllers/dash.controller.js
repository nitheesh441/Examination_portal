const Dashboard = require("../models/dashboard.model")
const Exams = require("../models/exams.model");
const Results = require("../models/result.model")
const tester = (req, res) => {
    return res.send("Hello From dashboard!");
};
const DashboardGetController = async (req, res) => {
   
  

    try {
      
          const notice = await Dashboard.find().sort({ createdAt: -1 });
          res.status(200).json({ success: true, notice });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
  };

  const DashboardPostController =  async (req, res) => {
    const message = req.body.message;


    try {
      const result = await Dashboard.findOneAndUpdate(
        { _id: 1 }, // Use _id: 1 to always update the document with _id 1
        { $set: { message: message, date: new Date() } }, // Set message and current date
        { upsert: true, new: true }
      );

      res.status(200).send({
        success: true,
        message: result.upserted ? 'Announcement created successfully' : 'Announcement updated successfully',
        data: result
      });
    } catch (error) {
      console.error('Error handling announcement:', error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  };

  const UpExamGetController = async (req, res) => {
   
  

    try {
      const currentDate = new Date();
      currentDate.setHours(0,0,0,0);
      

      const exams = await Exams.find(
        { 'subjects.date': { $gte: currentDate } }, 
        { examName: 1, _id: 0 } 
      ).sort({ 'subjects.date': 1 }); 
  
  
      res.status(200).json(exams);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    const UpResultGetController = async (req, res) => {
   
  

      try {
        const currentDate = new Date();
  
        const results = await Results.find(
        
          { examName: 1, _id: 0 } 
        ).sort({ 'subjects.date': 1 }); 
    
    
        res.status(200).json(results);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };

module.exports = {
    tester,DashboardGetController,DashboardPostController,UpExamGetController,UpResultGetController
    
};