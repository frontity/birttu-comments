import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import { formatDate, formatTime } from '../../utils';

const msgId = '[iFrameSizer]';

const config = {
  autoResize: true,
  bodyBackground: null,
  bodyMargin: null,
  bodyMarginV1: 8,
  bodyPadding: null,
  checkOrigin: true,
  enablePublicMethods: false,
  heightCalculationMethod: 'offset',
  interval: 32,
  log: false,
  maxHeight: Infinity,
  maxWidth: Infinity,
  minHeight: 0,
  minWidth: 0,
  scrolling: false,
  sizeHeight: true,
  sizeWidth: false,
  tolerance: 0,
  closedCallback: () => {},
  initCallback: () => {},
  messageCallback: () => {},
  resizedCallback: () => {},
};

const buildMessage = iframeId =>
  `${msgId}${[
    iframeId,
    config.bodyMarginV1,
    config.sizeWidth,
    config.log,
    config.interval,
    config.enablePublicMethods,
    config.autoResize,
    config.bodyMargin,
    config.heightCalculationMethod,
    config.bodyBackground,
    config.bodyPadding,
    config.tolerance,
  ].join(':')}`;

class Birttu extends Component {
  constructor(props) {
    super(props);
    this.iframeRef = createRef();
    this.iframeId = `birttu-comments-${props.type}-${props.id}`;
    this.state = { height: 826 };
  }

  componentDidMount() {
    window.addEventListener('message', this.handleOnMessage);
    this.iframeRef.current.addEventListener('load', this.handleOnLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleOnMessage);
    this.iframeRef.current.removeEventListener('load', this.handleOnLoad);
  }

  handleOnLoad = () => {
    const targetWindow = this.iframeRef.current.contentWindow;
    const initMessage = buildMessage(this.iframeId);
    targetWindow.postMessage(initMessage, '*');
  };

  handleOnMessage = ({ data }) => {
    if (typeof data === 'string' && data.startsWith(msgId)) {
      const [iframeId, height] = data.replace(msgId, '').split(':');
      if (this.iframeId === iframeId) this.setState({ height });
    }
  };

  render() {
    const { id, title, link, date, time, birttuId } = this.props;
    const src = `https://www.birttu.com/widget/widget.php?idarticulo=${id}&titunoti=${title}&fechanoti=${date}&horanoti=${time}&enlace=${link}&idmedio=${birttuId}`;
    const { height } = this.state;

    return (
      <Iframe
        ref={this.iframeRef}
        id={this.iframeId}
        title="birttu-comments"
        src={src}
        frameBorder="0"
        scrolling="no"
        styles={{ height }}
      />
    );
  }
}

Birttu.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  birttuId: PropTypes.number.isRequired,
};

export default inject(({ stores: { connection, settings } }, { type, id }) => {
  const entity = connection.entity(type, id);
  const { title, link, creationDate } = entity;
  const { birttuId } = settings.comments;
  const date = formatDate(creationDate);
  const time = formatTime(creationDate);
  return { id, title, link, date, time, birttuId };
})(Birttu);

const Iframe = styled.iframe`
  width: 100%;
  min-height: ${({ styles }) => styles.height}px;
`;
