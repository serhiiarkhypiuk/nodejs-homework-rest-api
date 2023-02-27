const { Contact } = require("../../models");

const getAll = async (req, res) => {
    const { id } = req.user;
    const {
        page = 1,
        limit = 10,
        favorite: reqFavorite = null,
        name: reqName = null,
        email: reqEmail = null
    } = req.query;

    const favorite = reqFavorite;
    const name = reqName;
    const email = reqEmail;

    const filterParams = {
        owner: id,
        ...(favorite ? {favorite} : null),
        ...(name ? {name} : null),
        ...(email ? {email} : null)
    }

    const skip = (page - 1) * limit;
    const data = await Contact.find(filterParams, "", {
        skip,
        limit: Number(limit),
    }).populate("owner", "_id name email subscription");

    res.status(200).json({ status: "success", code: 200, data });
};

module.exports = getAll;
