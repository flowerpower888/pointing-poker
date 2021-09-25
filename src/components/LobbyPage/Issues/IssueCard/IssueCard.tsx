import React, { FC } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import { useParams } from 'react-router-dom';
import styles from './issueCard.module.scss';
import issuesAPI from '../../../../api/issuesAPI';
import { Issue } from '../../../../models/GameInfoAggregate/GameInfoModel';

type IssueCardPropsType = {
  title?: string;
  editable?: boolean;
  showDeleteBtn?: boolean;
  showAddIssueInput?: boolean;
  issue?: Issue;
  setIsIssueFormShown?: React.Dispatch<React.SetStateAction<boolean>>;
};
const IssueCard: FC<IssueCardPropsType> = ({
  editable = false,
  showDeleteBtn = false,
  showAddIssueInput = false,
  title,
  issue,
  setIsIssueFormShown,
}) => {
  const { gameId } = useParams<{ gameId: string }>();

  const deleteIssue = async (id: string) => {
    try {
      await issuesAPI.delete(id, gameId);
    } catch {
      message.error('The issue was not deleted');
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.container}>
        <div>{issue ? issue.title : title}</div>
        <div>
          {showAddIssueInput && (
            <PlusOutlined
              className={styles.addedIcon}
              onClick={
                setIsIssueFormShown
                  ? () => {
                      setIsIssueFormShown(true);
                    }
                  : undefined
              }
            />
          )}
          {editable && <EditOutlined className={styles.editedIcon} />}
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
