const fitnessConsultantModel = require('../models/fitnessConsultantModel')
const getFitnessConsultantInfoController =async (req,res) => {

  try {
    const fitnessConsultant = await fitnessConsultantModel.findOne({userId: req.body.userId});
    res.status(200).send({
      success: true,
      message: 'fitness consultant  Data fetch success',
      data: fitnessConsultant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in fetching fitness consultant details',
      
    });
  }
 
};

//upate profile

const updateProfileController = async (req,res) => {


  try {
    const fitnessConsultant = await fitnessConsultantModel.findOneAndUpdate({userId: req.body.userId},req.body);
    res.status(201).send({
      success: true,
      message: 'fitness consultant  profile updated',
      data: fitnessConsultant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Fitness Consultant profile update issue',
      error,
      
    });
  }
}


  //get single fitness consultant


  
  const getFitnessConsultantByIdController =  async (req,res) => {

    
  try {
    const fitnessConsultant = await fitnessConsultantModel.findOne({_id:req.body.fitnessConsultantId});
    res.status(200).send({
      success: true,
      message: 'Single Fitness Consultant Info Fetched',
      data: fitnessConsultant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Single Fitness Consultant Info',
      
      
    });
  }

  };

  const fitnessConsultantAppointmentsController = () =>{}; 
  

module.exports = { getFitnessConsultantInfoController,updateProfileController,getFitnessConsultantByIdController,fitnessConsultantAppointmentsController};
