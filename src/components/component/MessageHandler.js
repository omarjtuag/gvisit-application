import React from 'react';
import { Modal } from 'antd';

const MessageHandler = (message) => {
    return Modal.error({
        title: 'Mensaje del sistema',
        content: message
    });
}

export default MessageHandler;