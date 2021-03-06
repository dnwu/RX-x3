import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './../App'
import Main from './../containers/main'
import Login from './../containers/login'
import Register from './../containers/register'

import DeviceActivation from './../pages/DeviceActivation'
import InterDeploy from './../pages/InterDeploy'
import FaceManage from './../pages/FaceManage'
import CameraManage from './../pages/CameraManage'
// import RelayManage from './../pages/RelayManage'
import PositionInfo from './../pages/PositionInfo'
import FaceInfo from './../pages/FaceInfo'
import WayInfo from './../pages/WayInfo'
import FaceList from './../pages/FaceList'



import ProjectTest from './../pages/ProjectTest'
import Esthesis from './../pages/Esthesis'
import Arrange from './../pages/Arrange'
import Qrcode from './../pages/qr-code'

// import System from './../pages/System'
import CaptureLog from './../pages/captureLog'
import PassLog from './../pages/passLog'
import OperateLog from './../pages/OperateLog'
import Storage from './../pages/Storage'
import Monitor from './../pages/Monitor'

class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/' render={() => 
                            <Main>
                                <Switch>
                                    <Route path='/internet/activation' component={DeviceActivation} />
                                    <Route path='/internet/deploy' component={InterDeploy} />

                                    <Route path='/devicedeploy/face' component={FaceManage} />
                                    <Route path='/devicedeploy/carmera' component={CameraManage} />
                                    {/* <Route path='/devicedeploy/relay' component={RelayManage} /> */}

                                    <Route path='/function/position' component={PositionInfo} />
                                    <Route path='/function/faceInfo' component={FaceInfo} />
                                    <Route path='/function/wayInfo' component={WayInfo} />
                                    <Route path='/function/faceList' component={FaceList} />

                                    <Route path='/project/projectTest' component={ProjectTest} />
                                    <Route path='/project/esthesis' component={Esthesis} />
                                    <Route path='/project/arrange' component={Arrange} />
                                    <Route path='/project/qr-code' component={Qrcode} />

                                    <Route path='/system/captureLog' component={CaptureLog} />
                                    <Route path='/system/passLog' component={PassLog} />
                                    <Route path='/system/operateLog' component={OperateLog} />
                                    <Route path='/system/storage' component={Storage} />
                                    <Route path='/system/monitor' component={Monitor} />
                                    <Redirect to="/login" />
                                </Switch>
                            </Main>
                        } />
                    </Switch>
                </App>
            </Router>
        )
    }
}
export default IRouter