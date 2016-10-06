import React, { Component } from 'react';

import Switch from 'react-toolbox/lib/switch';
import Input from 'react-toolbox/lib/input';

import FormChangePassword from './../../components/forms/user/changePassword.jsx';
// import FormMotion from './../../components/forms/motion/config.jsx';
// import OnOff from './../../components/faceRecognition/on_off.jsx';
// import ModelFR from './../../components/faceRecognition/model.jsx';

class Config extends Component {
	render() {
    return (
      <Ui.Tabs ref="config" key="0">
        <Ui.Tab label='Admin'>
          <FormChangePassword />
        </Ui.Tab>
      </Ui.Tabs>
    )
	}
}
export default Config;
