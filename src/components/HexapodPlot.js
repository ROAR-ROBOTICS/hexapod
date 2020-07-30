import React from "react"
import * as defaults from "../templates"
import { getNewPlotParams } from "../hexapod"

const Plot = React.lazy(() => import('./CustomPlot'))
class HexapodPlot extends React.Component {
    cameraView = defaults.CAMERA_VIEW
    state = { ready: false }

    logCameraView = relayoutData => {
        this.cameraView = relayoutData["scene.camera"]
    }

    componentDidMount() {
        this.setState({ready: true})
    }

    render() {
        if (!this.state.ready) {
            return <p>Loading your cute robot...</p>
        }

        if (!this.props.hexapod) {
            return null
        }
        const [data, layout] = getNewPlotParams(this.props.hexapod, this.cameraView)

        const props = {
            data,
            layout,
            onRelayout: this.logCameraView,
            revision: this.props.revision,
            config: { displaylogo: false, responsive: true },
            style: { height: "100%", width: "100%" },
            useResizeHandler: true,
        }
        return <Plot {...props} />
    }
}

export default HexapodPlot
