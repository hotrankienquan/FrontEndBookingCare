// import { divide } from 'lodash';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        // let arrUsers = this.state.arrUsers;
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

                           
                                        <tr>
                                            <td>{'item.email'}</td>
                                            <td>{'item.firstName'}</td>
                                            <td>{'item.lastName'}</td>
                                            <td>{'item.address'}</td>
                                            <td>
                                                <button className='btn-edit'
                                                   
                                                ><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'
                                                    
                                                ><i class="far fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    
                        </tbody>

                    </table>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
