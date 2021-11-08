import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
           let response = await getAllCodeService('gender');
           // errCode chứ ko phải errorCode
           if(response && response.errCode === 0) {
                
               this.setState({
                   genderArr: response.data
               })
           }
           console.log('check response' ,response)
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        // console.log('check state', this.state);
        let genders = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    USer redux - learn react redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>Thêm mới người dùng</div>
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
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Role Id</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Image</label>
                                <input type='text' className='form-control'/>
                            </div>
                            <div className='col-12 mt-3'>

                            <button className='btn btn-primary'>lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
		language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
