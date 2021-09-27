import React, { FC } from 'react';
import { Form, Input, Button, Select, Typography, Modal, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import issuesAPI from '../../../api/issuesAPI';
import { Issue } from '../../../models/GameInfoAggregate/GameInfoModel';

type FormValuesType = {
  title: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
};

type IssueFormPropsType = {
  isIssueFormShown: boolean;
  setIsIssueFormShown: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
  isAdding: boolean;
  issue?: Issue;
};

const IssueForm: FC<IssueFormPropsType> = ({
  isIssueFormShown,
  setIsIssueFormShown,
  editable,
  isAdding,
  issue,
}) => {
  const { Option } = Select;
  const { Title } = Typography;
  const { gameId } = useParams<{ gameId: string }>();

  const onFinish = async (values: FormValuesType) => {
    if (isAdding) {
      const newIssue: Issue = {
        id: uuidv4(),
        ...values,
      };
      try {
        await issuesAPI.add(newIssue, gameId);
      } catch {
        message.error('The issue was not added');
      }
    } else if (issue && editable) {
      try {
        const newIssue: Issue = {
          id: issue.id,
          ...values,
        };
        await issuesAPI.update(newIssue, issue.id, gameId);
      } catch {
        message.error('The issue was not updated');
      }
    }

    setIsIssueFormShown(false);
  };

  const onCancel = () => setIsIssueFormShown(false);

  return (
    <Modal visible={isIssueFormShown} onCancel={onCancel} footer={null}>
      <Title style={{ textAlign: 'center' }}>
        {isAdding ? 'Create Issue' : 'Edit issue'}
      </Title>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        initialValues={issue}
        autoComplete="off"
      >
        <Form.Item
          label="Title:"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Link" name="link">
          <Input />
        </Form.Item>

        <Form.Item label="Priority:" name="priority">
          <Select style={{ width: 120 }} defaultValue="low">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="hight">High</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            Yes
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            No
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IssueForm;
