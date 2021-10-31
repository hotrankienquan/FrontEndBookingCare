import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
class HomeHeader extends Component {

	render() {

		console.log('check props', this.props);

		return (
			<>
				<div className='home-header-container'>
					<div className='home-header-content'>
						<div className='left-content'>
							<i className="fas fa-bars"></i>
							<div className='header-logo'>

							</div>
						</div>
						<div className='center-content'>
							<div className='child-content'>
								<div><b><FormattedMessage id="homeheader.specility" /></b></div>
								<div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
							</div>
							<div className='child-content'>
								<div><b>Cơ sở y tế</b></div>
								<div className='subs-title'>Chọn bệnh viện phòng khám</div>
							</div>
							<div className='child-content'>
								<div><b>Bác sĩ</b></div>
								<div className='subs-title'>Chọn bác sĩ giỏi</div>
							</div>
							<div className='child-content'>
								<div><b>Gói khám</b></div>
								<div className='subs-title'>Khám sức khoẻ tổng quát</div>
							</div>

						</div>
						<div className='right-content'>
							<div className='support'><i className="fas fa-question-circle"></i>hỗ trợ</div>
							<div className='language-vi active'>VN</div>
							<div className='language-en active'>EN</div>
						</div>
					</div>
				</div>
				<div className='home-header-banner'>
					<div className='content-up'>
						<div className='title1'>
							<FormattedMessage id="banner.title1" />
						</div>
						<div className='title2'>
							<FormattedMessage id="banner.title2" />

						</div>
						<div className='search'>
							<i className="fab fa-searchengin"></i>
							<input type='text' placeholder='tìm kiếm khoa khám bệnh' />
						</div>
					</div>
					<div className='content-down'>
						<div className='options'>
							<div className='option-child'>
								<div className='icon-child'><i className="far fa-hospital"></i></div>
								<div className='text-child'><FormattedMessage id="banner.child1" /></div>
							</div>
							<div className='option-child'>
								<div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
								<div className='text-child'><FormattedMessage id="banner.child2" /></div>
							</div>
							<div className='option-child'>
								<div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
								<div className='text-child'><FormattedMessage id="banner.child3" /></div>
							</div>
							<div className='option-child'>
								<div className='icon-child'><i className="fab fa-windows"></i></div>
								<div className='text-child'><FormattedMessage id="banner.child4" /></div>
							</div>
							<div className='option-child'>
								<div className='icon-child'><i className="fas fa-syringe"></i></div>
								<div className='text-child'><FormattedMessage id="banner.child5" /></div>
							</div>
							<div className='option-child'>
								<div className='icon-child'><i className="fas fa-flask"></i></div>
								<div className='text-child'><FormattedMessage id="banner.child6" /></div>
							</div>
						</div>
					</div>
				</div>
			</>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
