import { connect } from 'react-redux'
import React, { Component } from 'react'

const mapStateToProps = (state) => {
    return {
        code: state.song.code
    }
}

const SongCodeView = ({code, show, isNew}) =>
    <pre style={{
        textTransform: 'initial',
        borderStyle: 'inset',
        padding: 2,
        backgroundColor: isNew ? '#dcdbff' : '#f3f3f3',
        display: `${show ? '' : 'none'}`
    }}>
        {code}
    </pre>

const SongCode = connect(
    mapStateToProps
)(SongCodeView)

export default SongCode