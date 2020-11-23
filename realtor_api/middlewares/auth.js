const apartments_api = require('../db/api/apartments');

const canDeleteApartment = async (req, res, next) => {
    let cookie = JSON.parse(req.cookies['logged-user'])[0];
    const cookie_user_id = cookie.id
    const apartment_id = req.params.apartmentId
    const isOK = await apartments_api.getById(apartment_id);
    
    if (isOK[0].user_id != cookie_user_id) {
        res.status(401).json('Not Authorized');
        return;
    }
    next();
}

module.exports = {
    canDeleteApartment
}