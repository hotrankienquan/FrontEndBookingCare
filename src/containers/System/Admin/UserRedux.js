import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import {getAllCodeService} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import * as actions from '../../../store/actions';
import'./userRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr:[],
            previewImgUrl: '',
            isOpen: false
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
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
       
    }
    handleOnchangeImage = (event) => {
        let data =event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl
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
    render() {
        // console.log('check state', this.state);
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        // console.log('check props from redux', this.props.genderRedux)
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
                                <input className='form-control' type='email'></input>
                            </div>
                            <div className='col-3'>
                                <label>password</label>
                                <input className='form-control' type='password'></input>
                            </div>
                            <div className='col-3'>
                                <label>FirstName</label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label>LastName</label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label>Phone Number</label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-9'>
                                <label>Address</label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label>Gender</label>
                                <select id="inputState" className="form-control">
                                    {genders && genders.length > 0 && 
                                    
                                        genders.map((item ,index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                    
                                    {/* <option>...</option> */}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Position</label>
                                <select id="inputState" className="form-control">
                                    {positions && positions.length > 0 &&
                                    positions.map((item,index) => {
                                            return (

                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Role Id</label>
                                <select id="inputState" className="form-control">
                                {roles && roles.length > 0 &&
                                    roles.map((item,index) => {
                                            return (

                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

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
                            <div className='col-12 mt-3'>

                            <button className='btn btn-primary'>lưu</button>
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
        positionRedux: state.admin.positions
    };
};
// ket noi redux va react
const mapDispatchToProps = dispatch => {
    return {
        //fire event cua redux 
        getGenderStart: () =>dispatch(actions.fetchGenderStart()),

        getPositionStart: () =>dispatch(actions.fetchPositionStart()),


        getRoleStart: () =>dispatch(actions.fetchRoleStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
