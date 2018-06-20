import React from 'react';
import SettingEditorContainer from 'containers/SettingEditorContainer';
import AuthContainer from 'containers/AuthContainer';
import './PageCommon.css'


const Setting = () => {
    return (
        <div className="responsiblePageArea">
            <AuthContainer>
                <SettingEditorContainer />
            </AuthContainer>
        </div>
    );
};

export default Setting;