import React, { Component } from 'react'
import stringifyColor from '../../../stringifyColor'

class Track extends Component {
    constructor () {
        super()

        this.state = {
            imBeingDragged: false
        }

        this.handleDragStart = this.handleDragStart.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
    }

    componentWillUnmount () {
        window.removeEventListener('drop', this.handleDrop)
        window.removeEventListener('dragover', this.handleDragOver)
    }

    handleDragStart (e) {
        window.addEventListener('drop', this.handleDrop)
        window.addEventListener('dragover', this.handleDragOver)

        e.dataTransfer.setData('trackId', this.props.track.id)
        e.dataTransfer.setData('type', this.props.track.type)
        e.dataTransfer.setData('editorId', this.props.track.editorId)
        e.dataTransfer.setData('channel', this.props.channel)
        setTimeout(
            () => {
                this.setState({
                    imBeingDragged: true
                })
            },
            1
        )
    }

    handleDragOver (e) {
        e.preventDefault()
    }

    handleDrop (e) {
        if ( !e.target.closest('.channel-track.droppable') )
        // if ( !e.target.classList.contains('channel-track') || !e.target.classList.contains('droppable') )
            return this.props.removeTrack(this.props.channel, this.props.track.editorId)

        this.setState({
            imBeingDragged: false
        })

        window.removeEventListener('drop', this.handleDrop)
        window.removeEventListener('dragover', this.handleDragOver)
    }

    render () {
        const track = this.props.track
        const detail = this.props.detail
        return (
            <span
                draggable = { true }
                onDragStart = { this.handleDragStart }
                data-position = { this.props.position }
                className = { `draggable ${track.type === 'tune' ? 'draggable-tune' : 'draggable-drum' } ${this.state.imBeingDragged ? 'beingdragged' : ''}` }
                style = { {width: detail.ticks*2, backgroundColor: stringifyColor(detail.color, 'rgba', {a: 0.5}), borderColor: stringifyColor(detail.color, 'rgb')} }
            >
            </span>
        )
    }
}

export default Track
