import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Switch, Typography, Modal } from 'antd';
import UploadAvatar from './UploadAvatar';
import './LobbyForm.scss';
import gameAPI from '../../api/gameAPI';
import memberAPI from '../../api/memberAPI';
import { Role } from '../../types/types';

type PropsType = {
  isOwner: boolean;
  closePopup: () => void;
};

type FormValuesType = {
  firstName: string;
  lastName?: string;
  jobPosition?: string;
};

const LobbyForm: React.FunctionComponent<PropsType> = ({
  isOwner,
  closePopup,
}) => {
  const { Title } = Typography;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<Role>('player');
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const history = useHistory();

  const onFinish = async (values: FormValuesType) => {
    setIsLoading(true);
    let imagePath = '';

    try {
      if (imageFile) {
        imagePath = await gameAPI.addPhoto(imageFile).then(res => res.data);
      }

      if (isOwner) {
        const response = await gameAPI.create({
          ...values,
          userRole: role,
          imagePath,
        });
        localStorage.setItem('gameId', response.data.gameId);
        localStorage.setItem('userId', response.data.userId);
        history.push(`/${response.data.gameId}`);
      } else {
        const gameId = localStorage.getItem('gameId');
        if (gameId) {
          const response = await memberAPI.add(
            { ...values, userRole: role, imagePath },
            gameId,
          );
          localStorage.setItem('userId', response.data.userId);
          history.push(`/${gameId}`);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      closePopup();
    }
  };

  return (
    <Modal visible footer={null} onCancel={closePopup}>
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Confirm
          </Button>
          <Button htmlType="button" onClick={closePopup}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LobbyForm;
