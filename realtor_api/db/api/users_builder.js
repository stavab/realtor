class UsersBuilder {
    constructor(){
        this.query = '';
        this.limit = '';
        this.params = [];
    }
    allUsers = (page, size) =>{
        this.query = "SELECT * from users WHERE "; 
        this.limit = ` limit ${(page-1)*size}, ${size}`;
        return this;
    }
    id = (id) => {
        this.query += `(${!id ? '1': (this.params.push(id), 'id = ? ')}) and `;
        return this;
    }
    role_id = (role_id) => {
        this.query += `(${!role_id ? '1': (this.params.push(role_id), 'role_id = ? ')}) and `;
        return this;
    }
    first_name = (first_name) => {
        this.query += `(${!first_name ? '1': (this.params.push(first_name), 'first_name = ? ')}) and `;
        return this;
    }
    last_name = (last_name) => {
        this.query += `(${!last_name ? '1': (this.params.push(last_name), 'last_name = ? ')}) and `;
        return this;
    }
    email = (email) => {
        this.query += `(${!email ? '1': (this.params.push(email), 'email = ? ')}) and `;
        return this;
    }
    password = (password) => {
        this.query += `(${!password ? '1': (this.params.push(password), 'password = ? ')}) and `;
        return this;
    }
    phone = (phone) => {
        this.query += `(${!phone ? '1': (this.params.push(phone), 'phone = ? ')}) and `;
        return this;
    }
    status = (status) => {
        this.query += `(${!status ? '1': (this.params.push(status), 'status = ? ')}) `;
        return this;
    }
    build = ()=>{
        this.query += this.limit;
        return {query: this.query, params: this.params}
    }
}

module.exports = UsersBuilder;

