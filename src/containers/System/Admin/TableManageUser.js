// import { divide } from 'lodash';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
		this.props.fetchUserRedux();
	}
	componentDidUpdate(prevProps, prevState){
		if(prevProps.listUsers !== this.props.listUsers) {
			this.setState({
				usersRedux:this.props.listUsers
			})
		}
	}
	handleDeleteUser =(user) => {
		// console.log('check user', user)
		this.props.deleteAUserRedux(user.id);
	}
	handleEditUser  = (user) => {
		// console.log('edit', user)
		this.props.handleEditUserFromParentKey(user);
	}
    render() {
        // let arrUsers = this.state.arrUsers;
		// console.log('check all users', this.props.listUsers)
		// console.log('check state', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
		return (
                    <table id="tableManageUser">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
							{arrUsers && arrUsers.length > 0 
							&& arrUsers.map ((item, index) => {
								return (
									<tr key={index}>
										<td>{item.email}</td>
										<td>{item.firstName}</td>
										<td>{item.lastName}</td>
										<td>{item.address}</td>
										<td>
											<button className='btn-edit'
											onClick={() => this.handleEditUser(item)}
											><i className="fas fa-pencil-alt"></i></button>
											<button className='btn-delete'
											onClick={() => this.handleDeleteUser(item)}
											><i class="far fa-trash-alt"></i></button>
										</td>
								</tr>
								)
							})}
                           
                                        
                                    
                        </tbody>

                    </table>
                
        );
    }

}

const mapStateToProps = state => {
	// hàm này dùng để hứng actions, hứng cái kết quả
    return {
		// state của redux , gọi tới adminReducer trong root reducer
		// sau đó gọi tớI initState users
		listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () =>dispatch(actions.fetchAllUserStart()),
		deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};
// ham connect sẽ inject actions vào component, 
//sau đó hàm  mapDispatchToProps map actions vào props
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
