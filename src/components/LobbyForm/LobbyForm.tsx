import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Switch, Typography, Modal } from 'antd';
import UploadAvatar from '../UploadAvatar';
import './LobbyForm.scss';

const LobbyForm: React.FunctionComponent = () => {
  const { Title } = Typography;

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [role, setRole] = useState<string>('player');
  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const onFinish = (values: { field: string }) => {
    const imagePath = '';
    if (imageFile) {
      console.log(imageFile);
      const data = new FormData();
      data.append('image', imageFile);
    }
    console.log('Success:', { ...values, role, imagePath });
  };

  return (
    <Modal visible={isOpen} footer={null} onCancel={() => setIsOpen(false)}>
      <Title>Connect to lobby</Title>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Your first name:"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Your last name:" name="lastName">
          <Input />
        </Form.Item>

        <Form.Item label="Your job position:" name="jobPosition">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ sm: { offset: 2, span: 18 } }}>
          <UploadAvatar setImageFile={setImageFile} />
        </Form.Item>

        <Form.Item label="Connect as Observer" labelCol={{ sm: { offset: 8 } }}>
          <Switch
            onChange={(checked: boolean) =>
              setRole(checked ? 'observer' : 'player')
            }
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
          <Button htmlType="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LobbyForm;
