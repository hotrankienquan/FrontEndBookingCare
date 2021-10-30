import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: ''
		}
		// this.state.email = this.state['email'] 2 cach viet tuong tu
	}

	componentDidMount() {
		// console.log('didmounted edit modal', this.props.currentUser)
		// jquery giup js viet ngan hon, nhanh hon
		// let { currentUser } = this.props;
		let user = this.props.currentUser;
		// su dung cac ham trong lodash check 
		if (user && !_.isEmpty(user)) {
			console.log('check user from modal edit', user);
			this.setState({
				id: user.id,
				email: user.email,
				password: 'hardcode',
				firstName: user.firstName,
				lastName: user.lastName,
				address: user.address
			})
		}

	}
	toggle = () => {
		this.props.toggleFromParent();
	}
	handleOnChangeInput = (event, id) => {

		// this.state[id] = event.target.value;
		// this.setState({
		// 	...this.state
		// }, () => {
		// 	console.log('check bad code', this.state)
		// })
		//good code
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState
		}, () => {
			// console.log('check good code', this.state)
		})
		// console.log('copy ', copyState);
		// console.log(event.target.value, id)

	}
	checkValidateInput = () => {
		let isValid = true;
		let arrayInput = ['email', 'password', 'firstName', 'lastName', 'address'];
		// dung vong map ko dung break continue duoc
		for (let i = 0; i < arrayInput.length; i++) {
			if (!this.state[arrayInput[i]]) {
				//!this.state[arrayInput[i]] === !this.state['email']
				isValid = false;
				alert('missing parameters: ' + arrayInput[i]);
				break;

			}
		}
		return isValid;
	}
	handleSaveUser = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			this.props.editUser(this.state);

			// console.log('add user', this.state)
		}
	}
	render() {
		console.log('check props from child', this.props.currentUser)
		// console.log('check child props', this.props);
		// console.log('check child open modal', this.props.isOpen);
		// console.log('check text', this.props.text);
		return (
			<div>
				<Modal isOpen={this.props.isOpen}
					toggle={() => this.toggle()}
					className='modal-user-container'
					size='lg'
					centered
				>
					<ModalHeader toggle={() => this.toggle()}>
						Edit a new user
					</ModalHeader>
					<ModalBody>

						<div className='modal-user-body'>
							<div className='input-container'>
								<label>Email</label>
								<input

									value={this.state.email}
									type='text' onChange={(event) => { this.handleOnChangeInput(event, "email") }}
									disabled
								></input>
							</div>
							<div className='input-container'>
								<label>Password</label>
								<input
									value={this.state.password}

									type='password' onChange={(event) => this.handleOnChangeInput(event, 'password')}
									disabled
								></input>
							</div>
							<div className='input-container'>
								<label>Firstname</label>
								<input
									value={this.state.firstName}

									type='text' onChange={(event) => this.handleOnChangeInput(event, 'firstName')}></input>
							</div>
							<div className='input-container'>
								<label>Lastname</label>
								<input
									value={this.state.lastName}

									type='text' onChange={(event) => this.handleOnChangeInput(event, 'lastName')}></input>
							</div>
							<div className='input-container max-width-input'>
								<label>Address</label>
								<input
									value={this.state.address}

									type='text' onChange={(event) => this.handleOnChangeInput(event, 'address')}></input>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							className='px-3'
							onClick={() => this.handleSaveUser()}
						>
							Save changes
						</Button>
						{' '}
						<Button onClick={() => this.toggle()}
							className='px-3'
						>
							Close
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

