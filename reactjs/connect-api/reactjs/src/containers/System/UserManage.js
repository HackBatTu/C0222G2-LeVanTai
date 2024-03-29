import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        console.log(response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {

    }

    /**vòng đời
     * Run components
     * 1. run construct -> init state
     * 2. Did mount (set state)
     * 3.render
     */
    render() {
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    test={'abc'}
                />
                <div className="title text"> Manager</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                    onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"/>
                        Create new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                    <thead className="thead-dark">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        { arrUsers && arrUsers.map((item, index) => {
                            console.log('check = ' ,item,index)
                            return ( 
                             <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn-edit"><i className="fas fa-pencil-alt"/></button>
                                    <button className="btn-delete"><i className="fas fa-frash"/></button>
                                </td>
                            </tr>
                            )
                        })}
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
