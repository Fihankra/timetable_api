const ConfigService = require('../services/config.service');

exports.createConfig = async (req, res) => {
    try {
        //console.log(req.body);
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Config data is required' });
            return;
        }
        //check if config already exists
        const config = await ConfigService.getConfigByYearAndSemester(data.year, data.semester);
        console.log(config);
        if (config && config.length > 0) {
            res.json({ status: false, message: 'Config with same year and semester already exist' });
            return;
        }
        //create config
        const newConfig = await ConfigService.createConfig(data);
        if(!newConfig){
            res.json({ status: false, message: 'Failed to create config' });
            return
        }
        const configs = await ConfigService.getConfigs();
        res.json({ status: true, message: 'Config created successfully', data: configs });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
};

// Retrieve and return all configs from the database.
exports.findAll = async (req, res) => {
    try {
        const configs = await ConfigService.getConfigs();
        res.json({ status: true, message: "Data found", data: configs });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// update a config identified by the configId in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Config data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Config id is required' });
            return
        }
        //update config
        const updatedConfig = await ConfigService.updateConfig(id, data);
        if (!updatedConfig) {
            res.json({ status: false, message: `Cannot update Config with id=${id}. Config not found` });
            return;
        }
        const configs = await ConfigService.getConfigs();
        res.json({ status: true, message: 'Config updated successfully', data: configs });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}

