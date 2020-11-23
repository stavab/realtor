import fetcher from './fetcher';

async function getUsersFromServer (handleSuccess,extension) {
    try {
        const users = await fetcher.get(`${extension}`)
        handleSuccess(users)
    }
    catch(error) {
        return(error)
    }
}

async function userLogIn(data,handleLogIn) {
    try {
        const result = await fetcher.post('/login', data);
        handleLogIn(result)
    } catch(error){
        handleLogIn(error)
    }
}

async function registerUser(data, handleSuccess) {
    try {
        await fetcher.post('/register', data);
        handleSuccess()
    } catch(error){
        return (error)
    }
}

async function getUserById(extension) {
    try{
        const success = await fetcher.get(`/users${extension}`);
        return success
    } catch (error) {
        console.log(error)
    }
}

async function updateUserStatusInServer(data) {
    try {
        const success = fetcher.put(`/users`, data)
        return success
    } catch(error){
        return (error)
    }
}

export {getUsersFromServer, userLogIn, getUserById, registerUser, updateUserStatusInServer};