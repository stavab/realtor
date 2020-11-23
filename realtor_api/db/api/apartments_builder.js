class ApartmentsBuilder {
    constructor(){
        this.query = '';
        this.limit = '';
        this.params = [];
    }
    allApartments = (page, size) =>{
        this.query = "SELECT apartments.*, cities.`name` as 'city_name', countries.`name` as 'country_name' from apartments join cities on apartments.`city_id` = cities.`id` join countries on cities.`country_id` = countries.`id` WHERE ";      
        this.limit = ` limit ${(page-1)*size}, ${size}`;
        return this;
    }
    id = (id) => {
        this.query += `(${!id ? '1': (this.params.push(id), 'id = ? ')}) and `;
        return this;
    }
    user_id = (user_id) => {
        this.query += `(${!user_id ? '1': (this.params.push(user_id), 'user_id = ? ')}) and `;
        return this;
    }
    city_id = (city_id) => {
        this.query += `(${!city_id ? '1': (this.params.push(city_id), 'city_id = ? ')}) and `;
        return this;
    }
    price = (price) => {
        this.query += `(${!price ? '1': (this.params.push(price), 'price = ? ')}) and `;
        return this;
    }
    sale_status = (sale_status) => {
        this.query += `(${!sale_status ? '1': (this.params.push(sale_status), 'sale_status = ? ')}) and `;
        return this;
    }
    availability = (availability) => {
        this.query += `(${!availability ? '1': (this.params.push(availability), 'availability = ? ')}) and `;
        return this;
    }
    property_type = (property_type) => {
        this.query += `(${!property_type ? '1': (this.params.push(property_type), 'property_type = ? ')}) and `;
        return this;
    }
    number_of_room = (number_of_room) => {
        this.query += `(${!number_of_room ? '1': (this.params.push(number_of_room), 'number_of_room = ? ')}) and `;
        return this;
    }
    number_of_bath = (number_of_bath) => {
        this.query += `(${!number_of_bath ? '1': (this.params.push(number_of_bath), 'number_of_bath = ? ')}) `;
        return this;
    }
    build = ()=>{
        this.query += this.limit;
        return {query: this.query, params: this.params}
    }
}


module.exports = ApartmentsBuilder;