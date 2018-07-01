import SettingEditor from '../components/setting/SettingEditor';
import * as actions from '../actions/setting';
import { connect } from 'react-redux';
import { Storage } from 'aws-amplify';

const mapStateToProps = ({ setting }) => {
    return setting;
};

const mapDispatchToProps = (dispatch) => ({
    onSave: (config) => {
        dispatch(actions.settingSaveInProgress())
        let configJson = JSON.stringify(config)
        Storage.put('config.json', configJson, {
            level: 'private',
            contentType: 'text/json'
        })
            .then(result => {
                localStorage.setItem('config', configJson)
                dispatch(actions.settingSaveSuccess(result))
                dispatch(actions.updateConfig())
            })
            .catch(err => {
                dispatch(actions.settingSaveFailed(err))
            });
    },
    loadConfig: (callback) => {
        dispatch(actions.settingLoadInProgress());
        Storage.get('config.json', { level: 'private', contentType: 'text/json' })
            .then(result => {
                return fetch(result).then((resp) => resp.json());
            })
            .then(result => {
                localStorage.setItem('config', JSON.stringify(result))
                dispatch(actions.updateConfig())
                callback(result);
                dispatch(actions.settingLoadSuccess());
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.settingLoadFailed(err));
            });
    }
});

const SettingEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingEditor);

export default SettingEditorContainer;