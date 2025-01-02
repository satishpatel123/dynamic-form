const MasterSetting = require('../models/MasterSetting');
const DynamicForm = require('../models/DynamicForm');

// Fetch all settings
let masterSettings = {
    fields: [
        { id: 1, name: 'firstName', label: 'First Name', type: 'text', required: true },
        { id: 2, name: 'email', label: 'Email', type: 'email', required: true },
        { id: 3, name: 'age', label: 'Age', type: 'number', required: false },
    ],
};
const getSettings = async (req, res) => {
    try {
        const settings = await MasterSetting.find();
        const result = await DynamicForm.findOne();
        
        const resNewData = [];
        if(settings.length) {
          settings.forEach(element => {
            resNewData.push({_id : element._id , key: element.key, value : element.value , formValues : result?.value[element.key] ? result?.value[element.key] : '', createdAt : element.createdAt, updatedAt : element.updatedAt})
          });
        }
        res.send(resNewData);
    } catch (error) {
      console.log('error => ',error);
      
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
};

// Save settings to the database (insert, update, or delete)
const updateSetting = async (req, res) => {
    try {
      const { updatedSettings, deletedSettings } = req.body;
  
      // Delete settings
      await MasterSetting.deleteMany({ key: { $in: deletedSettings } });
  
      // Update or insert new settings
      const bulkOperations = updatedSettings.map((setting) => ({
        updateOne: {
          filter: { key: setting.key },
          update: { $set: setting },
          upsert: true, // Insert if not found
        },
      }));
  
      await MasterSetting.bulkWrite(bulkOperations);
  
      res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving settings' });
    }
  };

  const createSettings = async (req, res) => {
    try {
      console.log('req.body => ',req.body);
      const { value } = req.body;  
      await DynamicForm.create({
        value
      });
  
      res.status(200).json({ status : true, message: 'Form Create has been successfully' });
    } catch (error) {
      res.status(500).json({ status : false, error: 'Error saving settings' });
    }
  };
  

  const getDynamicSettings = async (req, res) => {
    try {
      const result = await DynamicForm.find();
      res.status(200).json({ status : true, data : result });
    } catch (error) {
      res.status(500).json({ status : false, error: 'Error saving settings' });
    }
  };

  const getDynamicFormOneSettings = async (req, res) => {
    try {
      const result = await DynamicForm.findOne();
      res.status(200).json({ status : true, data : result });
    } catch (error) {
      res.status(500).json({ status : false, error: 'Error saving settings' });
    }
  };

module.exports = { getSettings, updateSetting, createSettings, getDynamicSettings, getDynamicFormOneSettings };
