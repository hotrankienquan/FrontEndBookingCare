import actionTypes from './actionTypes';
import {getAllCodeService, createNewUser} from '../../services/userService';

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
				dispatch(saveUserSuccess())
			}else{
				dispatch(saveUserFailed())
			}
		}catch(e) {
			dispatch(saveUserFailed())
		}
	}
}
export const saveUserSuccess = () => ({
	type: 'CREATE_USER_SUCCESS'
})
export const saveUserFailed = () => ({
	type: 'CREATE_USER_FAILED'
})