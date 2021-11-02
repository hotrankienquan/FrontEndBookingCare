import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {
	render() {


		return (
			<div className='home-footer'>
				<p>&copy; 2021 Hồ Trần Kiến Quân <a target="blank" href="https://www.facebook.com/ricute222" alt="link-face">More information about me.&#8594; CLick here &#8592;</a></p>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
