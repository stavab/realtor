import fetcher from './fetcher';

const getDataFromServer = (handleSuccess,extension) => {
    fetcher.get(`/${extension}`).then(success => {
            handleSuccess(success)
        }
    ).catch(error => console.log(error))
};

async function getDataFromServerById (handleSuccess,extension) {
    try{
        const success = await fetcher.get(`/apartments/${extension}`) 
        handleSuccess(success);       
    } catch (error) {
        console.log(error)
    }
}

async function getDataFromServerByWishList(handleSuccess, extension) {
    try {
        const success = await fetcher.get(`/apartments/wishList/${extension}`) 
        handleSuccess(success);    
    } catch(error){
        return (error)
    }
}

async function deleteDataFromServerById (extension) {
    try{
        const success = await fetcher.delete(`/apartments/${extension}`) 
        return success       
    } catch (error) {
        console.log(error)
    }
}

async function uploadApartmentToServer(data) {
    try {
        const apartment = await fetcher.post(`/apartments/`, data)  
        return apartment
    } catch(error){
        return (error)
    }
}

async function updateApartmentInServer(data) {
    console.log('in update apartment to server', data)
    try {
        const success = await fetcher.put(`/apartments/`, data)
        return success
    } catch(error){
        return (error)
    }
}

async function updateApartmentStatusInServer(data) {
    try {
        const success = await fetcher.put(`/apartments/status`, data)
        return success
    } catch(error){
        return (error)
    }
}


export {
    getDataFromServer,
    getDataFromServerById,
    uploadApartmentToServer,
    updateApartmentInServer,
    updateApartmentStatusInServer,
    deleteDataFromServerById,
    getDataFromServerByWishList
};