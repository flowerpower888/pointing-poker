import React, { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Input } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons/lib/icons';
import { v4 as uuidv4 } from 'uuid';
import { Issue } from '../../../models/GameInfoAggregate/GameInfoModel';
import issuesAPI from '../../../api/issuesAPI';
import styles from './issues.module.scss';
import IssueCard from './IssueCard';
import IssueForm from '../IssueForm';

type IssuesPropsType = {
  editable?: boolean;
  onIssueClick?: (issue: Issue) => void;
  currentIssue?: Issue | null;
  showAddIssueInput?: boolean;
  showDeleteBtn?: boolean;
  tasks: Array<Issue>;
};

const Issues: React.FunctionComponent<IssuesPropsType> = ({
  editable = true,
  onIssueClick,
  currentIssue,
  showAddIssueInput = true,
  showDeleteBtn = true,
  tasks,
}) => {
  const [isIssueFormShown, setIsIssueFormShown] = useState<boolean>(false);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Issue>({} as Issue);
  const { gameId } = useParams<{ gameId: string }>();

  const addIssue = (event: FormEvent) => {
    event.preventDefault();

    const newIssue: Issue = {
      id: uuidv4(),
      title: newIssueTitle,
      priority: 'medium',
    };

    if (newIssueTitle.length > 0) {
      issuesAPI.add(newIssue, gameId);
      setNewIssueTitle('');
    }
  };

  const editIssue = (event: FormEvent) => {
    event.preventDefault();
    issuesAPI.update(currentItem, currentItem.id, gameId);
    setIsEditing(false);
  };

  return (
    <div className={styles.issues}>
      <h2 className="lobby-title">Issues</h2>
      {isIssueFormShown && <IssueForm />}
      {tasks.map(task => (
        <IssueCard issue={task} editable showDeleteBtn />
      ))}

      <IssueCard
        showAddIssueInput
        title="Create"
        setIsIssueFormShown={setIsIssueFormShown}
      />
    </div>
  );
};

export default Issues;
