import React, { ChangeEvent, FC, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Modal,
  message,
  Popover,
} from 'antd';
import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import issuesAPI from '../../../api/issuesAPI';
import {
  Issue,
  IssueWithoutId,
} from '../../../models/GameInfoAggregate/GameInfoModel';
import './issueForm.scss';
import Hint from './Hint';

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
  const { Title, Text } = Typography;
  const { gameId } = useParams<{ gameId: string }>();
  const uploadedFile = React.createRef<HTMLInputElement>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<string | number | readonly string[]>(
    '',
  );

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

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setIsLoading(true);
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = function () {
        if (reader.result && typeof reader.result === 'string') {
          let tasksFromFile: any;
          try {
            tasksFromFile = JSON.parse(reader.result);
          } catch {
            message.error('Problem with your file.');
            setIsLoading(false);
            return;
          }
          if (!Array.isArray(tasksFromFile)) {
            setIsLoading(false);
            return;
          }

          const filteredTasksFromFile: IssueWithoutId[] = tasksFromFile.filter(
            task =>
              task.title &&
              typeof task.title === 'string' &&
              (!task.link || (task.link && typeof task.link === 'string')) &&
              (task.priority === 'low' ||
                task.priority === 'medium' ||
                task.priority === 'high'),
          );

          const filteredTasksFromFileWithId: Issue[] =
            filteredTasksFromFile.map(task => ({
              id: uuidv4(),
              title: task.title,
              link: task.link,
              priority: task.priority,
            }));

          issuesAPI.addSome(filteredTasksFromFileWithId, gameId);
          setIsLoading(false);
          setIsIssueFormShown(false);
          setFileList('');
        }
      };

      reader.onerror = function () {
        message.error(reader.error);
        setIsLoading(false);
      };

      try {
        reader.readAsText(file);
      } catch {
        message.error('Error with reading file!');
      }
    }
  };

  return (
    <Modal visible={isIssueFormShown} onCancel={onCancel} footer={null}>
      <Title style={{ textAlign: 'center' }}>
        {isAdding ? 'Create Issue' : 'Edit issue'}
      </Title>
      <div style={{ fontSize: '20px', textAlign: 'center', marginTop: -10 }}>
        <Text>Upload issues from your own file?</Text>
        <Popover
          content={<Hint />}
          title={<span style={{ fontSize: 18 }}>Hint</span>}
          trigger="hover"
          placement="bottomRight"
        >
          <InfoCircleOutlined
            style={{ height: 5, width: 5, marginLeft: 5, cursor: 'pointer' }}
          />
        </Popover>
      </div>
      <div style={{ textAlign: 'center', margin: '12px 0 15px 0' }}>
        <Button
          icon={<UploadOutlined />}
          type="primary"
          loading={isLoading}
          onClick={() => {
            uploadedFile.current?.click();
          }}
        >
          Upload
        </Button>
        <input
          style={{ width: 0, height: 0 }}
          type="file"
          accept=".json"
          value={fileList}
          ref={uploadedFile}
          onChange={uploadFile}
        />
      </div>

      <Title level={3} style={{ textAlign: 'center' }}>
        Or
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
