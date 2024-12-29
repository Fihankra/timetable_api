const Config = require('../schemas/config.schema');

exports.createConfig = async (config) => {
    return await Config.create(config);
};

exports.getConfigs = async () => {
    return await Config.find();
};

exports.getConfigById = async (id) => {
    return await Config.find({ id: id });
};

exports.updateConfig = async (id, config) => {
    return await Config.findOneAndUpdate
        ({
            id: id
        }, config, { new: true });
}

exports.getConfigByYearAndSemester = async (year, semester,studyMode) => {
    return await Config.find({ year: year, semester: semester, studyMode: studyMode });
};

