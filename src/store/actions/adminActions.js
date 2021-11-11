import actionTypes from './actionTypes';
import {getAllCodeService, createNewUser, getAllUsers,
	 deleteUserService, editUserService, getTopDoctorHome} from '../../services/userService';
import {toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
	return async (dispatch, getState) => {

		try{
			dispatch({
				type: actionTypes.FETCH_GENDER_START
			})
			let res = await getAllCodeService("GENDER");
			if(res && res.errCode === 0){
				// console.log('check getState; ', getState)
				// console.log('check errCode: ', res.errCode);
				dispatch(fetchGenderSuccess(res.data))
			}else{
				dispatch(fetchGenderFailed())
			}
		}catch(e) {
			dispatch(fetchGenderFailed())
			console.log('fetchGenderStart',e)
		}
	}
}

// start doing end : code chuan
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
	data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
	data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
	data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
	return async (dispatch, getState) => {

		try{
			let res = await getAllCodeService("POSITION");
			if(res && res.errCode === 0){
				// console.log('check getState; ', getState)
				// console.log('check errCode: ', res.errCode);
				dispatch(fetchPositionSuccess(res.data))
			}else{
				dispatch(fetchPositionFailed())
			}
		}catch(e) {
			dispatch(fetchPositionFailed())
		}
	}
}

export const fetchRoleStart = () => {
	return async (dispatch, getState) => {

		try{
			let res = await getAllCodeService("ROLE");
			if(res && res.errCode === 0){
				// console.log('check getState; ', getState)
				// console.log('check errCode: ', res.errCode);
				dispatch(fetchRoleSuccess(res.data))
			}else{
				dispatch(fetchRoleFailed())
			}
		}catch(e) {
			dispatch(fetchRoleFailed())
		}
	}
}
// create user in userRedux
export const createNewUser2 = (data) => {
	return async (dispatch, getState) => {

		try{
			let res = await createNewUser(data) ;
			console.log('check create user redux', res)
			if(res && res.errCode === 0){
				// console.log('check getState; ', getState)
				// console.log('check errCode: ', res.errCode);
				toast.success('Create a new user succeed!');
				dispatch(saveUserSuccess())
				dispatch(fetchAllUserStart());
			}else{
				dispatch(saveUserFailed())
			}
		}catch(e) {
			dispatch(saveUserFailed())
		}
	}
}
export const saveUserSuccess = () => ({
	type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
	type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
	return async (dispatch, getState) => {

		try{
			let res = await getAllUsers("All");// chú ý All và ALL
			// console.log('check res 1:  ', res1)
			if(res && res.errCode === 0){
				
				dispatch(fetchAllUserSuccess(res.users.reverse()))
			}else{
				toast.error("failed fetch all user start");
				dispatch(fetchAllUserFailed())
			}
		}catch(e) {
			dispatch(fetchAllUserFailed())
		}
	}
}

export const fetchAllUserSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_USER_SUCCESS,
	// data lấy từ api về, nhét hết vào actions
	users: data 
})
export const fetchAllUserFailed = () => ({
	type: actionTypes.FETCH_ALL_USER_FAILED,
	// data lấy từ api về, nhét hết vào actions
})
// delete user redux
export const deleteAUser = (userId) => {
	return async (dispatch, getState) => {

		try{
			let res = await deleteUserService(userId) ;
			console.log('check create user redux', res)
			if(res && res.errCode === 0){
				// console.log('check getState; ', getState)
				// console.log('check errCode: ', res.errCode);
				toast.success('Delete a user succeed!');
				dispatch(deleteUserSuccess())
				dispatch(fetchAllUserStart());
			}else{
				toast.error('Delete a user error!');
				dispatch(deleteUserFailed())
			}
		}catch(e) {
			dispatch(deleteUserFailed())
		}
	}
}
export const deleteUserSuccess = () => (
	{
		type: actionTypes.DELETE_USER_SUCCESS
	}
)
export const deleteUserFailed = () => (
	{
		type: actionTypes.DELETE_USER_FAILED
	}
)
// edit a user redux
export const editAUser = (data) => {
	return async (dispatch, getState) => {

		try{
			let res = await editUserService(data) ;
			console.log('check create user redux', res)
			if(res && res.errCode === 0){
				toast.success('update a user succeed!');
				dispatch(editUserSuccess())
				dispatch(fetchAllUserStart());
			}else{
				toast.error('update a user error!');
				dispatch(editUserFailed())
			}
		}catch(e) {
			toast.error('update a user error!');
			dispatch(editUserFailed())
		}
	}
}
export const editUserSuccess = () => ({
	type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
	type: actionTypes.EDIT_USER_FAILED
})

// let res1 = await getTopDoctorHome(2);
export const fetchTopDoctor = () => {
	return async (dispatch, getState) => {

		try{
			let res = await getTopDoctorHome('');
			if(res && res.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
					dataDoctor: res.data
				})
			}else {
				dispatch({
					type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
				})
			}
			console.log('check respinse ', res)
		}catch(e) {
			console.log('falied', e)
			dispatch({
				type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
			})
		}
	}
}