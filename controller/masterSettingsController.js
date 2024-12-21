const MasterSetting = require('../models/MasterSetting');

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
        res.send(settings);
    } catch (error) {
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
  
  

module.exports = { getSettings, updateSetting };
