const { Users } = require('../models/user')

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).send({
            users,
            message: 'get users successfully!!'
        })
    } catch (err) {
        console.log(`err in getAllUsers::`, err.message);
        res.status(500).send({
            message: err.message
        })
    }
}

let masterSettings = {
    fields: [
        { id: 1, name: 'firstName', label: 'First Name', type: 'text', required: true },
        { id: 2, name: 'email', label: 'Email', type: 'email', required: true },
        { id: 3, name: 'age', label: 'Age', type: 'number', required: false },
    ],
};

const getMasterSettings = async (req, res) => {
    try {
        const data = masterSettings;
        res.status(200).send({
            data,
            message: 'get master settings successfully!!'
        })
    } catch (err) {
        console.log(`err in getMasterSettings::`, err.message);
        res.status(500).send({
            message: err.message
        })
    }
}


const updateMasterSettings = async (req, res) => {
    try {
        const data = masterSettings;
        res.status(200).send({
            data,
            message: 'get master settings successfully!!'
        })
    } catch (err) {
        console.log(`err in updateMasterSettings::`, err.message);
        res.status(500).send({
            message: err.message
        })
    }
}

// Fetch all settings
const getSettings = async (req, res) => {
    try {
      const settings = await MasterSetting.find();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  };
  
  // Update a specific setting by key
  const updateSetting = async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
  
    try {
      const setting = await MasterSetting.findOne({ key });
  
      if (!setting) {
        return res.status(404).json({ error: 'Setting not found' });
      }
  
      setting.value = value;
      await setting.save();
  
      res.json({ message: 'Setting updated successfully', setting });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update setting' });
    }
  };
  


//   app.post('/api/master-settings', (req, res) => {
//     masterSettings = req.body;
//     res.status(200).send('Settings updated successfully!');
//   });

const createUser = async (req, res) => {
    try {
        if (req.body.user && req.body.user != '') {

            const users = new Users(req.body.user);
            await users.save();
            res.status(200).send({
                users,
                message: 'user create successfully!!'
            })
        } else {
            res.status(400).send({
                users,
                message: 'Bad request!!'
            })
        }
    } catch (err) {
        console.log(`err in createUser::`, err.message);
        res.status(500).send({
            message: err.message
        })
    }
}


module.exports = { getAllUsers, createUser, getMasterSettings, updateMasterSettings, getSettings, updateSetting  }

// module.exports ={createUser}