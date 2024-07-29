
const Faculty= require("../models/faculty.model")

const testfaculty = (req, res) => {
    return res.send("Hello From Faculties!");
};

const FacultysGetController = async (req, res) => {
    try {
        const { staffid } = req.body;
        

        
        if (!staffid) {
          return res.status(400).json({ message: 'Staff is required' });
        }
    
        const faculty = await Faculty.findOne({ staffid });
        if (!faculty) {
          return res.status(404).json({ message: 'faculty not found' });
        }
    
        res.status(200).json(faculty);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Error fetching student profile' });
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
module.exports = {
    testfaculty,FacultysGetController,DashboardPostController
    
};