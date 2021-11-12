// import { divide } from 'lodash';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
			contentMarkdown: '',
			contentHTML : '',
			selectedDoctor:'',
			description: '',
			listDoctors: []
        }
    }
    componentDidMount() {
		this.props.fetchAllDoctor();
	}
	buildDataInputSelect = (inputData) => {
		let result = []
		let {language} = this.props;
		if(inputData && inputData.length > 0){
			inputData.map((item, index) => {

				let object = {}
				let labelVi = `${item.lastName} ${item.firstName}`
				let labelEn = `${item.firstName} ${item.lastName}`
				object.label = language === LANGUAGES.VI ? labelVi : labelEn
				object.value = item.id;
				result.push(object)
			})
		}
		return result;
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.allDoctors !== this.props.allDoctors){
			let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
			this.setState({
				listDoctors: dataSelect
			})
		}
		if(prevProps.language !== this.props.language){
			let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
			this.setState({
				listDoctors: dataSelect
			})
		}
	}
	handleEditorChange = ({ html, text })  => {
		this.setState({
			contentMarkdown: text,
			contentHTML: html
		})
	}
	handleSaveContent =() => {
		console.log('check state', this.state)
		this.props.saveDetailDoctor2({
			contentHTML: this.state.contentHTML,
			contentMarkdown: this.state.contentMarkdown,
			description: this.state.description,
			doctorId: this.state.selectedDoctor.value
		})
	}
	handleChange = (selectedDoctor) => {
		this.setState({ selectedDoctor });
		console.log(`Option selected:`, selectedDoctor);
	  };
	  handleOnChangeDesc = (event) => {
		  this.setState({
			  description: event.target.value
		  })
	  }
    render() {
		console.log('check state', this.state)
		return (
			<div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>tạo thông tin doctor</div>
	  				<div className='more-infor'>
						  <div className='content-left'>
							
							<label>
								  Chọn bác sĩ
							  </label>
									<Select
									
									value={this.state.selectedDoctor}
									onChange={this.handleChange}
									options={this.state.listDoctors}
									/>
						  </div>
						  <div className='content-right'>
						  	<label>thông tin giới thiệu:</label>
							<textarea className='form-control' rows="4"
									onChange={(event) => this.handleOnChangeDesc(event)}
									value={this.state.description}
									>abcxyz
							</textarea>
						  </div>
					  </div>
					  <div className='manage-doctor-editor'>
					  <MdEditor style={{ height: '500px' }}
					   renderHTML={text => mdParser.render(text)} 
					   onChange={this.handleEditorChange} 
					  
					  />
				  </div>
					  <button className='save-content-doctor'
					  onClick={() => this.handleSaveContent()}
					  >Lưu thông tin</button>
              </div>  
        );
    }

}

const mapStateToProps = state => {
	// hàm này dùng để hứng actions, hứng cái kết quả
    return {
		// state của redux , gọi tới adminReducer trong root reducer
		// sau đó gọi tớI initState users
		allDoctors: state.admin.allDoctors,
		language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
		fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
		saveDetailDoctor2: (data) => dispatch(actions.saveDetailDoctor2(data))
    };
};
// ham connect sẽ inject actions vào component, 
//sau đó hàm  mapDispatchToProps map actions vào props
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
