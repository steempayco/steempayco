import SettingEditor from '../components/setting/SettingEditor';
import * as actions from '../actions/setting';
import { connect } from 'react-redux';
import { Storage } from 'aws-amplify';
import config from 'config';

const mapStateToProps = ({setting}) => {
    return setting;
};

const mapDispatchToProps = (dispatch) => ({
    onSave: (config) => {
        console.log(config)
        dispatch(actions.updateConfig())

        dispatch(actions.settingSaveInProgress())
        let configJson = JSON.stringify(config)
        Storage.put('config.json', configJson, {
            level: 'private',
            contentType: 'text/json'
        })
        .then (result => {
            dispatch(actions.settingSaveSuccess(result))
        })
        .catch(err => {
            dispatch(actions.settingSaveFailed(err))
        });
    },
    loadConfig: (callback) => {
        dispatch(actions.settingLoadInProgress());
        Storage.get('config.json', { level: 'private', contentType: 'text/json'})
        .then(result => {
            return fetch(result).then((resp) => resp.json());
        })
        .then(result => {
            callback(result);
            dispatch(actions.settingLoadSuccess());
        })
        .catch(err => {
            callback(config);
            dispatch(actions.settingLoadFailed(err));
        });
    }
});

const SettingEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingEditor);

export default SettingEditorContainer;