import { Button, notification, Space, message } from 'antd';
import React from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType) => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

// const App = () => (
//   <Space>
//     <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
//     <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
//     <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
//     <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
//   </Space>
// );

const showErrorMessage = ( content: string) => {
    message.error({
        duration:3,
        content
    });
};
const showSuccessMessage = (content: string) => {
    message.success({
        duration:3,
        content
    });
};
const showInfoMessage = (content: string) => {
    message.warning({
        duration:3,
        content
    });
};


// export default App;
module.exports = {
    showErrorMessage,
    showSuccessMessage,
    showInfoMessage
}