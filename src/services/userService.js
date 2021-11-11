import axios from '../axios';
const handleLoginApi = (userEmail, userPassword) => {
	return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
	return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUser = (data) => {
	return axios.post('/api/create-new-user', data);
}
const deleteUserService = (userId) => {
	// return axios.delete('/api/delete-user', { id: userId })
	return axios.delete("/api/delete-user", {
		// headers: {
		//   Authorization: `Bearer ${token}`,
		// },
		data: {
			id: userId
		},
	})
}
const editUserService = (inputData) => {
	return axios.put("/api/edit-user", inputData);
	// inputData frontend truyen vo data ben backend

}
const getAllCodeService = (inputType) => {
	return axios.get(`/api/allcode?type=${inputType}`);

}
const getTopDoctorHome = (limit) => {
	return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
export { handleLoginApi, getAllUsers, createNewUser, deleteUserService, editUserService, getAllCodeService 
,getTopDoctorHome}