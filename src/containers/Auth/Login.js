import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isShowPassword: false
		}
	}
	handleOnChangeUserName = (e) => {
		this.setState({
			username: e.target.value
		})
	}
	handleOnChangePassword = (e) => {
		this.setState({
			password: e.target.value
		})
	}
	handleLogin = () => {
		console.log(this.state.username)
		console.log(this.state.password)
	}
	handleShowHidePassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword
		})
	}
	render() {

		return (
			<div className='login-background'>
				<div className='login-container'>
					<div className='login-content row'>
						<div className='col-12 text-login'>Login</div>
						<div className='col-12 form-group login-input'>
							<label>Username</label>
							<input type='text' className='form-control' placeholder='Enter your username'
								value={this.state.username}
								onChange={(e) => this.handleOnChangeUserName(e)}
							/>
						</div>
						<div className='col-12 form-group login-input'>
							<label>Password</label>
							<div className='custom-input-password'>
								<input
									type={this.state.isShowPassword ? 'text' : 'password'}
									className='form-control'
									placeholder='Enter your password'
									onChange={(e) => this.handleOnChangePassword(e)}
								/>
								<span
									onClick={(e) => this.handleShowHidePassword(e)}
								>
									<i
										class={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'
										}></i>
								</span>
							</div>
						</div>
						<div className='col-12'>
							<button className='btn-login'
								onClick={() => this.handleLogin()}
							>Login</button>

						</div>
						<div className='col-12'>
							<span className='forgot-password'>Forgot your password?</span>
						</div>
						<div className='col-12 text-center mt-5'>
							<span>Or Login with: </span>
						</div>
						<div className='col-12 social-login'>
							<i className="fab fa-google-plus-g google"></i>
							<i className="fab fa-facebook facebook"></i>
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
		navigate: (path) => dispatch(push(path)),
		adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
		adminLoginFail: () => dispatch(actions.adminLoginFail()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);