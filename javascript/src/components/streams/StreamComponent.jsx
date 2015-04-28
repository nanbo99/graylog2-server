'use strict';

var React = require('react/addons');
var StreamsStore = require('../../stores/streams/StreamsStore');
var StreamList = require('./StreamList');
var CreateStreamButton = require('./CreateStreamButton');
var SupportLink = require('../support/SupportLink');

var StreamComponent = React.createClass({
    getInitialState() {
        return {
            streams: []
        };
    },
    componentDidMount() {
        this.loadData();
    },
    loadData() {
        StreamsStore.load((streams) => {
            this.setState({streams: streams});
        });
    },
    _onDeleteStream(stream) {
        if (window.confirm("Do you really want to remove this stream?")) {
            StreamsStore.remove(stream.id, () => {
                this.loadData();
            });
        }
    },
    _onResumeStream(stream) {
        StreamsStore.resume(stream.id, () => {
            this.loadData();
        });
    },
    _onUpdateStream(streamId, stream) {
        StreamsStore.update(streamId, stream, () => {
            this.loadData();
        });
    },
    _onSave(streamId, stream) {
        StreamsStore.save(stream, () => {
            this.loadData();
        });
    },
    _onCloneStream(streamId, stream) {
        StreamsStore.cloneStream(streamId, stream, () => {
            this.loadData();
        });
    },
    _onCreateStream(evt) {
        this.refs.createStreamButton.onClick();
    },
    render() {
        // @if(isPermitted(STREAMS_CREATE)) {
        var createStreamButton = <CreateStreamButton ref='createStreamButton' onSave={this._onSave} />;
        return (
            <div>
                <div className="row content content-head">
                    <div className="col-md-10">
                        <h1>Streams</h1>

                        <p className="description">
                            You can route incoming messages into streams by applying rules against them. If a message
                            matches all rules of a stream it is routed into it. A message can be routed into multiple
                            streams. You can for example create a stream that contains all SSH logins and configure
                            to be alerted whenever there are more logins than usual.

                            Read more about streams in <a href="http://docs.graylog.org/en/latest/pages/streams.html" target="_blank">the documentation</a>.
                        </p>

                        <SupportLink>
                            Take a look at the
                            <a href="http://docs.graylog.org/en/latest/pages/external_dashboards.html" target="_blank">Graylog stream dashboards</a>
                            for wall-mounted displays or other integrations.
                        </SupportLink>
                    </div>

                    {createStreamButton}
                </div>

                <div className="row content">
                    <div className="col-md-12">
                        <StreamList streams={this.state.streams} createStream={this._onCreateStream}
                                    onDelete={this._onDeleteStream} onResume={this._onResumeStream}
                                    onUpdate={this._onUpdateStream} onClone={this._onCloneStream}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = StreamComponent;
