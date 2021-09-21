import React, { useState, FormEvent } from 'react';
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
import './issues.scss';

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
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Issue>({} as Issue);

  const addIssue = (event: FormEvent) => {
    event.preventDefault();

    const newIssue: Issue = {
      id: uuidv4(),
      title: newIssueTitle,
      priority: 'medium',
    };

    if (newIssueTitle.length > 0) {
      issuesAPI.add(newIssue);
      setNewIssueTitle('');
    }
  };

  const editIssue = (event: FormEvent) => {
    event.preventDefault();
    issuesAPI.update(currentItem, currentItem.id);
    setIsEditing(false);
  };

  const deleteIssue = (id: string) => () => {
    issuesAPI.delete(id);
  };

  return (
    <Col span={12}>
      <div className="issues">
        <h2 className="lobby-title">Issues</h2>
        {isEditing ? (
          <form
            className="issue_container"
            id="lobby-input_edit-issue"
            onSubmit={editIssue}
          >
            <Input
              value={currentItem.title}
              type="text"
              className="new-issue_input"
              onChange={event =>
                setCurrentItem({
                  id: currentItem.id,
                  title: event.target.value,
                  priority: 'medium',
                })
              }
            />
            <Button
              className="add-issue_btn"
              type="default"
              htmlType="submit"
              icon={<CheckOutlined />}
            />
            <Button
              className="add-issue_btn"
              type="default"
              htmlType="button"
              icon={<CloseOutlined onClick={() => setIsEditing(false)} />}
            />
          </form>
        ) : (
          <form
            className="issue_container"
            id="lobby-input_add-issue"
            onSubmit={addIssue}
          >
            {showAddIssueInput && (
              <>
                <Input
                  value={newIssueTitle}
                  type="text"
                  className="new-issue_input"
                  placeholder="add new issue"
                  onChange={event => setNewIssueTitle(event.target.value)}
                />
                <Button
                  className="add-issue_btn"
                  type="default"
                  htmlType="submit"
                  icon={<PlusOutlined className="new-issue_icon" />}
                />
              </>
            )}
          </form>
        )}
        <ul className="issue_container">
          {tasks.map(issue => (
            <li
              className={`issue-item ${
                currentIssue?.id === issue.id ? 'current' : ''
              }`}
              key={uuidv4()}
              onClick={onIssueClick ? () => onIssueClick(issue) : undefined}
              role="presentation"
            >
              {issue.title}
              <div>
                {editable && (
                  <EditOutlined
                    className="edit-issue_icon"
                    onClick={() => {
                      setCurrentItem(
                        tasks.filter(
                          issueListItem => issueListItem.id === issue.id,
                        )[0],
                      );
                      setIsEditing(true);
                    }}
                  />
                )}
                {showDeleteBtn && (
                  <DeleteOutlined
                    className="delete-issue_icon"
                    color="red"
                    onClick={deleteIssue(issue.id)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Col>
  );
};

export default Issues;
