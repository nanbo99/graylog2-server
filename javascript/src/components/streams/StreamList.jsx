'use strict';

var React = require('react/addons');
var Stream = require('./Stream');
var Alert = require('react-bootstrap').Alert;

var StreamList = React.createClass({
    getInitialState() {
        return {};
    },
    _formatStream(stream) {
        return <Stream key={"stream-" + stream.id} stream={stream}
                       onDelete={this.props.onDelete} onResume={this.props.onResume} onUpdate={this.props.onUpdate} onClone={this.props.onClone}/>;
    },
    _sortByTitle(stream1, stream2) {
        return stream1.title.localeCompare(stream2.title);
    },
    render() {
        if (this.props.streams.length > 0) {
            var streamList = this.props.streams.sort(this._sortByTitle).map(this._formatStream);

            return (
                <ul className="streams">
                    {streamList}
                </ul>
            );
        } else {
            // @if(isPermitted(STREAMS_CREATE))
            var createLink = <a onClick={this.props.createStream}>Create one now</a>;
            return (
                <Alert bsStyle='warning'>
                    <i className="fa fa-info-circle"></i>&nbsp;
                    No streams configured. {createLink}
                </Alert>
            );
        }
    }
});

module.exports = StreamList;
