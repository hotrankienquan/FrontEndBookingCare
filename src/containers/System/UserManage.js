// import { divide } from 'lodash';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUser } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {
    // ham constructor dai dien cho class
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }
    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
            // console.log('check state user 1', this.state.arrUsers);
        }
        // console.log(response)
    }
    /**
     * 
     * Life cycle
     * RUn component
     * 1. run contruct -> init state
     * 2. did mount (set state)
     * 3. render
     * mỗi lần setState thì nó sẽ tự re-render
     * mounted hieu nhu la born
     * unmounted hieu nhu la die
     * 
     */
    // cac function handle event dung arrow function
    handleAddNewUser = () => {
        // alert('click me');
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    createNewUser = async (data) => {
        // alert('call me');
        try {

            let response = await createNewUser(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
            // console.log('check respponse create new user', response);
        } catch (error) {
            console.log(error)
        }
        console.log('check data from child ', data)
    }
    render() {
        // console.log('check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    text={
                        'abc'
                    }
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                // ko dc them nhu nay  createNewUser={this.createNewUser()}
                />
                <div className='title text-center'>manage users with kq</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        /**
                         * cach 2
                         * onClick={this.handleNewUser(bind, this)}
                         */
                        onClick={() => this.handleAddNewUser()}
                    >Add new users</button>

                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'><i class="far fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
