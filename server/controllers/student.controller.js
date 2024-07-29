
const Student= require("../models/student.model")

const teststudents = (req, res) => {
    return res.send("Hello From Students!");
};

const StudentsGetController = async (req, res) => {
    try {
        const { rollNo } = req.body;
        
        if (!rollNo) {
          return res.status(400).json({ message: 'Roll number is required' });
        }
    
        const student = await Student.findOne({ rollNo });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
    
        res.status(200).json(student);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Error fetching student profile' });
      }
    };
    const StudentsGetAllController = async (req, res) => {
      try {
        
          
         
      
          const student = await Student.find().sort({"rollNo":1});
          if (!student) {
            return res.status(404).json({ message: 'Student not found' });
          }
      
          res.status(200).json(student);
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
    teststudents,StudentsGetController,StudentsGetAllController
    
};