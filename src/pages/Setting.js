import React from 'react';
import SettingEditorContainer from 'containers/SettingEditorContainer';
import './PageCommon.css'

const Setting = () => {
    return (
        <div className="pageArea">
            <h2>
                Setting
            </h2>
            <SettingEditorContainer />
        </div>
    );
};

export default Setting;