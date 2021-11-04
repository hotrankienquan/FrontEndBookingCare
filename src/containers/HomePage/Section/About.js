import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {
	render() {


		return (
			<div className='section-share section-about'>
				<div className='section-about-header'>Truyền thông nói gì</div>
				<div className='section-about-content'>
					<div className='content-left'>
						<iframe width="100%" height="500px" src="https://www.youtube.com/embed/SMdSqx99up8" title="YouTube video player"
							frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen>

						</iframe>
					</div>
					<div className='content-right'>
						<p>Tin Nóng Covid-19 Ngày 2/11.Dịch Virus Corona Việt Nam hôm nay vì sao Hà Nội tăng cấp độ dịch covid</p>
					</div>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
