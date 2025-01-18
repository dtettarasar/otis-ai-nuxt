import User from '../database/models/user'

const findUserByName = async (userName) => {
    try {
        const query = User.find({ username: userName }).select('username');
        return await query.exec();
    } catch (error) {
        console.error(error);
        return false;
    }
};

const findUserByEmail = async (userEmail) => {
    try {
        const query = User.find({ email: userEmail }).select('email');
        return await query.exec();
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getUserPsw = async (userID) => {
    try {
        const query = User.findById(userID).select('_id password');
        return await query.exec();
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = { findUserByName, findUserByEmail, getUserPsw };