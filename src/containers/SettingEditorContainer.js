import SettingEditor from '../components/setting/SettingEditor';
import * as actions from '../actions';
import { connect } from 'react-redux';

// store 안의 state 값을 props 로 연결해줍니다.
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    onSave: () => dispatch(actions.updateConfig())
})

const SettingEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingEditor);

export default SettingEditorContainer;