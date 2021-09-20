import React, { FC } from 'react';
import { Form, Input, Button, Select, Typography, Modal } from 'antd';

type FormValuesType = {
  title: string;
  link?: string;
  priority: 'low' | 'middle' | 'hight';
};

const IssueForm: FC = () => {
  const { Option } = Select;
  const { Title } = Typography;

  const onFinish = (values: FormValuesType) => console.log(values);

  const onCancel = () => console.log('cancel');

  return (
    <Modal visible onCancel={onCancel} footer={null}>
      <Title style={{ textAlign: 'center' }}>Create Issue</Title>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        initialValues={{ priority: 'low' }}
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
          <Select style={{ width: 120 }}>
            <Option value="low">Low</Option>
            <Option value="middle">Middle</Option>
            <Option value="hight">Hight</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
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
