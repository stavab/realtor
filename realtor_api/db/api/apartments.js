const connection = require('../config');
const ApartmentBuilder = require('./apartments_builder')


function getAll({id, user_id, city_id,price, number_of_room,sale_status,availability,property_type, number_of_bath, page = 1, size = 8}) {
    const builder = new ApartmentBuilder();
    return new Promise((resolve, reject) => {
        const {query,params} = builder.allApartments(page, size)
                        .id(id)
                        .user_id(user_id)
                        .city_id(city_id)
                        .price(price)
                        .sale_status(sale_status)
                        .availability(availability)
                        .property_type(property_type)
                        .number_of_room(number_of_room)
                        .number_of_bath(number_of_bath)
                        .build()
        connection.query(query, [...params,page,size], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function getById(apartmentId) {
    return new Promise((resolve, reject) => {
        let request = 'Select a.*, cities.`name` as city_name, countries.`name` as country_name from apartments a join cities on a.`city_id` = cities.`id` join countries on cities.`country_id` = countries.`id` where a.id = ?'
        // let request = 'Select a.*, cities.`name` as city_name, countries.`name` as country_name, group_concat(i.url) images from apartments a join cities on a.`city_id` = cities.`id` join countries on cities.`country_id` = countries.`id` join images i on a.id = i.apartment_id where a.id = ?'
        connection.query(request,[apartmentId], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function getCities() {
    return new Promise((resolve, reject) => {
        let request = 'Select * from cities'
        connection.query(request, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function getTotalCities() {
    return new Promise((resolve, reject) => {
        let request = 'select cities.name, city_id from apartments join cities on cities.id = apartments.city_id group by city_id'
        connection.query(request, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function deleteById(apartmentId) {
    return new Promise((resolve, reject) => {
        let qr = "DELETE FROM images WHERE apartment_id = ?"
        connection.query(qr, apartmentId, (error,results,fields) => {
            if(error) {
                console.log('er')
            }
        })
        let request = 'delete FROM apartments WHERE id = ?'
        connection.query(request, apartmentId, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function postApartment({user_id,address,city_id,price,number_of_room,number_of_bath,sqft,sale_status,property_type,main_image}) {
    let new_apartment = {
        user_id: user_id,
        address: address,
        city_id: city_id,
        price: price,
        number_of_room: number_of_room, 
        number_of_bath: number_of_bath, 
        sqft: sqft,
        sale_status:sale_status,
        property_type:property_type,
        main_image: main_image
    }
    
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO apartments SET ?'
        connection.query(sql, new_apartment, function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                resolve(results)
            }
        });
    });
}

function updateApartment({id,address,city_id,price,number_of_room,number_of_bath,sqft,sale_status,property_type,main_image}) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE apartments SET address = ?, city_id = ?, price = ?, number_of_room = ?, number_of_bath = ?, sqft = ?, sale_status = ?, property_type = ?, main_image = ? WHERE id = ?'
        connection.query(sql,[address, city_id, price, number_of_room, number_of_bath, sqft, sale_status, property_type, main_image, id], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}

function updateApartmentStatus(new_status) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE apartments SET status = ? WHERE id = ?'
        connection.query(sql,[new_status.status, new_status.id], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}

function getByWishList(userId) {
    return new Promise((resolve, reject) => {
        let request = `select wish_list.user_id as "liking person",apartments.*,
        cities.name as "city_name",countries.name as "country_name",
        GROUP_CONCAT(images.url)
        from wish_list
        join apartments 
        on apartments.id = wish_list.apartment_id
        join cities
        on apartments.city_id = cities.id
        join countries
        on cities.country_id = countries.id
        where wish_list.user_id = ?
        group by apartments.id
        `
        connection.query(request,userId, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {
    getAll,
    getById,
    deleteById,
    postApartment,
    updateApartment,
    getByWishList,
    updateApartmentStatus,
    getCities,
    getTotalCities
};