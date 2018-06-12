import SettingEditor from '../components/setting/SettingEditor';
import * as actions from '../actions';
import { connect } from 'react-redux';

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