import React, { FC, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import { useParams } from 'react-router-dom';
import styles from './issueCard.module.scss';
import issuesAPI from '../../../../api/issuesAPI';
import { Issue } from '../../../../models/GameInfoAggregate/GameInfoModel';
import IssueForm from '../../IssueForm';

type IssueCardPropsType = {
  title?: string;
  editable?: boolean;
  showDeleteBtn?: boolean;
  isAdding?: boolean;
  issue?: Issue;
  currentIssue?: Issue | null;
  onIssueClick?: (issue: Issue) => void;
};

const IssueCard: FC<IssueCardPropsType> = ({
  editable = false,
  showDeleteBtn = false,
  isAdding = false,
  title,
  issue,
  currentIssue,
  onIssueClick,
}) => {
  const { gameId } = useParams<{ gameId: string }>();
  const [isIssueFormShown, setIsIssueFormShown] = useState<boolean>(false);

  const deleteIssue = async (id: string) => {
    try {
      await issuesAPI.delete(id, gameId);
    } catch {
      message.error('The issue was not deleted');
    }
  };

  return (
    <Card
      className={`${styles.card} ${
        issue && currentIssue && currentIssue.id === issue.id
          ? styles.current
          : ''
      }`}
      onClick={onIssueClick && issue ? () => onIssueClick(issue) : undefined}
    >
      <div className={styles.container}>
        <div className={styles.text}>
          <div>{issue ? issue.title : title}</div>
          <div className={styles.priority}>{issue ? issue.priority : ''}</div>
        </div>
        <div>
          {isIssueFormShown && (
            <IssueForm
              setIsIssueFormShown={setIsIssueFormShown}
              isAdding={isAdding}
              editable={editable}
              issue={issue}
            />
          )}
          {isAdding && (
            <PlusOutlined
              className={styles.addedIcon}
              onClick={() => setIsIssueFormShown(true)}
            />
          )}
          {editable && (
            <EditOutlined
              className={styles.editedIcon}
              onClick={() => setIsIssueFormShown(true)}
            />
          )}
          {showDeleteBtn && issue && (
            <DeleteOutlined
              className={styles.deletedIcon}
              onClick={() => deleteIssue(issue.id)}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default IssueCard;
