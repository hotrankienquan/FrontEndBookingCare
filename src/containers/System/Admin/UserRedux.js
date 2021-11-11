import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import {getAllCodeService} from '../../../services/userService';
import {LANGUAGES, CRUD_ACTIONS} from '../../../utils';
import * as actions from '../../../store/actions';
import'./userRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';
import { FormattedMessage } from 'react-intl';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr:[],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: ''
            ,position:'',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        //cach 2
        // this.props.dispatch(actions.getGenderStart())


        // try {
        //    let response = await getAllCodeService('gender');
        //    // errCode chứ ko phải errorCode
        //    if(response && response.errCode === 0) {
                
        //        this.setState({
        //            genderArr: response.data
        //        })
        //    }
        //    console.log('check response' ,response)
        // } catch (e) {
        //     console.log(e)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        // hiện tại(this) và quá khứ (previous)
        // render => didupdate
        // quá khứ là mảng rỗng [], hiện tại  [3] 3 phần tử

        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: this.props.positionRedux,
                position:arrPositions && arrPositions.length > 0? arrPositions[0].key: ''
            })
        }
        // check prevprops xoá dữ liệu trong form sau khi tạo user thành công
       if(prevProps.listUsers !== this.props.listUsers){
        let arrGenders = this.props.genderRedux;
        let arrRoles = this.props.roleRedux;
        let arrPositions = this.props.positionRedux;
            // tat ca du lieu đã lưu hết trong redux, lấy ra dùng
           this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
            position:arrPositions && arrPositions.length > 0? arrPositions[0].key: '',
            role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
            avatar: '',
            action: CRUD_ACTIONS.CREATE,
           })
       }
    }
    handleOnchangeImage = (event) => {
        let data =event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file
            })
        }
        // day la 1 api cua html, quăng file vào 
        // nó tự tạo 1 url đê xem ảnh
        // console.log('check file', objectUrl)
    }
    openPreviewImage= () => {
        if(!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid =  this.checkValidateInput();
        if(isValid === false ) return;

        let {action} = this.state;
        if(action === CRUD_ACTIONS.CREATE){

            //fire redux create user action
            this.props.createNewUser2({
                        email: this.state.email,
                        password: this.state.password,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        address: this.state.address,
                        phonenumber: this.state.phoneNumber,
                        gender: this.state.gender,
                        roleId: this.state.role,
                        positionId: this.state.position
            })
        }
        if(action === CRUD_ACTIONS.EDIT) {
            // fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                // avatar: this.state.avatar
            })
        }
        // khi fire hàm này thì nó sẽ chạy vô admin reducer update lại
        // settimeout đợi nó lưu xún db rồi mớI action render lại
        // setTimeout(() => {

        //     this.props.fetchUserRedux();
        // }, 1000)
    }
    checkValidateInput = () => {
        let isValid =true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'
            ];
        for(let i = 0 ; i < arrCheck.length ; i++ ){
            if(!this.state[arrCheck[i]]) {
                    isValid = false;
                    break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        // email: '',
        //     password: '',
        //     firstName: '',
        //     lastName: '',
        //     phoneNumber: '',
        //     address: '',
        //     gender: ''
        //     ,position:'',
        //     role: '',
        //     avatar: ''
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserFromParent = (user) => {
        console.log('check handle edit user from parent', user);
        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
           })
    }
    render() {
        // console.log('check state', this.state);
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        // console.log('check props from redux', this.props.genderRedux)


        let {email, password, firstName, lastName, phoneNumber, address
        , role, position, gender} = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    USer redux - learn react redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>Thêm mới người dùng</div>
                            <div className='col-12'>{isGetGender === true ? 'Loading genders': ''}</div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                value={email}
                                onChange={(event) => {this.onChangeInput(event, 'email')}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true: false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>password</label>
                                <input className='form-control' type='password'
                                value={password}
                                onChange={(event) => {this.onChangeInput(event, 'password')}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true: false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>FirstName</label>
                                <input className='form-control' type='text'
                                value={firstName}
                                onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>LastName</label>
                                <input className='form-control' type='text'
                                value={lastName}
                                onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Phone Number</label>
                                <input className='form-control' type='text'
                                value={phoneNumber}
                                onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}></input>
                            </div>
                            <div className='col-9'>
                                <label>Address</label>
                                <input className='form-control' type='text'
                                value={address}
                                onChange={(event) => {this.onChangeInput(event, 'address')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Gender</label>
                                <select id="inputState" className="form-control"
                                onChange={(event) => {this.onChangeInput(event, 'gender')}}
                                value={gender}
                                >
                                    {genders && genders.length > 0 && 
                                    
                                        genders.map((item ,index) => {
                                            return (
                                                <option key={index}
                                                value={item.key}
                                                >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                    
                                    {/* <option>...</option> */}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Position</label>
                                <select id="inputState" className="form-control"
                                onChange={(event) => {this.onChangeInput(event, 'position')}}
                                value={position}
                                >
                                    {positions && positions.length > 0 &&
                                    positions.map((item,index) => {
                                        // console.log(item)
                                            return (

                                                <option key={index}
                                                value={item.key}
                                                >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Role Id</label>
                                <select id="inputState" className="form-control"
                                onChange={(event) => {this.onChangeInput(event, 'role')}}
                                value={role}
                                >
                                {roles && roles.length > 0 &&
                                    roles.map((item,index) => {
                                            return (

                                                <option key={index}
                                                value={item.key}
                                                >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Image</label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' hidden type='file' 
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>tải ảnh<i class="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})`}}
                                    onClick={() => this.openPreviewImage()}
                                    >


                                    </div>

                                </div>
                            </div>
                            <div className='col-12 my-3'>

                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning': 'btn btn-primary'}
                                onClick={() => this.handleSaveUser()}
                                >
                                    {
                                    this.state.action === CRUD_ACTIONS.EDIT ?
                                    <FormattedMessage id="manage-user.edit" />
                                    :
                                    <FormattedMessage id="manage-user.save" />
                                }
                                
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                handleEditUserFromParentKey ={this.handleEditUserFromParent}
                                action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.state.isOpen === true && 
                
                <Lightbox
                    mainSrc={this.state.previewImgUrl}
            
                    onCloseRequest={() => this.setState({ isOpen: false })}
           
                />
                }                    
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        // state là của thz redux, truy cập đến app của bên rootReducer
        // -> biến language trong appReducer
		language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender:state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,


		listUsers: state.admin.users

    };
};
// ket noi redux va react
const mapDispatchToProps = dispatch => {
    return {
        //fire event cua redux 
        getGenderStart: () =>dispatch(actions.fetchGenderStart()),

        getPositionStart: () =>dispatch(actions.fetchPositionStart()),


        getRoleStart: () =>dispatch(actions.fetchRoleStart()),
        createNewUser2: (data) => dispatch(actions.createNewUser2(data)),

        fetchUserRedux: () =>dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) =>dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
