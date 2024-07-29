const Feedback = require("../models/feedback.model")

const testfeedback = (req, res) => {
    return res.send("Hello From Feedbacks!");
};

const FeedbacksGetController = async (req, res) => {
   
  

    try {
      const feedback = await Feedback.find({ feedbackType: { $ne: 'Portal' } });
      res.status(200).json(feedback);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
  const FeedbacksPostController =  async (req, res) => {
    try {
        const { username, userType, feedbackType, message } = req.body;
    
      
        const newFeedback = new Feedback({
          username,
          userType,
          feedbackType,
          message,
          date: new Date(), 
        });
    
       
        await newFeedback.save();
    
        res.status(201).json({ success: true, message: 'Feedback submitted successfully.' });
      } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while submitting feedback.', error: error.message });
      }
    };
module.exports = {
    testfeedback,FeedbacksGetController,FeedbacksPostController
    
};