import React from 'react';
import { Issue } from '../../../models/GameInfoAggregate/GameInfoModel';
import styles from './issues.module.scss';
import IssueCard from './IssueCard';

type IssuesPropsType = {
  editable?: boolean;
  onIssueClick?: (issue: Issue) => void;
  currentIssue?: Issue | null;
  showAddIssueInput?: boolean;
  showDeleteBtn?: boolean;
  tasks: Array<Issue>;
  direction?: 'vertical' | 'horizontal';
};

const Issues: React.FunctionComponent<IssuesPropsType> = ({
  editable = true,
  onIssueClick,
  currentIssue,
  showAddIssueInput = true,
  showDeleteBtn = true,
  tasks,
  direction = 'horizontal',
}) => (
  <div>
    <h2 className="lobby-title">Issues</h2>
    <div
      className={`${styles.issues} ${
        direction === 'vertical' ? styles.vertical : ''
      }`}
    >
      {tasks.map(task => (
        <IssueCard
          issue={task}
          editable={editable}
          showDeleteBtn={showDeleteBtn}
          key={task.id}
          onIssueClick={onIssueClick}
          currentIssue={currentIssue}
        />
      ))}

      {showAddIssueInput && <IssueCard isAdding title="Create" />}
    </div>
  </div>
);

export default Issues;
