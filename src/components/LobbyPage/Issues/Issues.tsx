import React, { useState, useEffect, FormEvent } from 'react';
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
import gameAPI from '../../../api/gameAPI';
import './issues.scss';

type IssuesPropsType = {
  editable?: boolean;
  onIssueClick?: (issue: Issue) => void;
  currentIssue?: Issue | null;
  showAddIssueInput?: boolean;
  showDeleteBtn?: boolean;
};

const Issues: React.FunctionComponent<IssuesPropsType> = ({
  editable = true,
  onIssueClick,
  currentIssue,
  showAddIssueInput = true,
  showDeleteBtn = true,
}) => {
  const { gameId } = useParams<{ gameId: string }>();

  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Issue>({} as Issue);

  useEffect(() => {
    const getTasks = async () => {
      const gameInfo = (await gameAPI.getGameInfo(gameId)).data;
      setIssueList(gameInfo.tasks);
    };

    getTasks();
  }, []);

  const addIssue = (event: FormEvent) => {
    event.preventDefault();

    const newIssue: Issue = {
      id: uuidv4(),
      title: newIssueTitle,
      priority: 'medium',
    };

    if (newIssueTitle.length > 0) {
      setIssueList([...issueList, newIssue]);
      issuesAPI.add(newIssue);
      setNewIssueTitle('');
    }
  };

  const editIssue = (event: FormEvent) => {
    event.preventDefault();

    setIssueList(
      issueList.map(item => (item.id === currentItem.id ? currentItem : item)),
    );
    issuesAPI.update(currentItem, currentItem.id);
    setIsEditing(false);
  };

  const deleteIssue = (id: string) => () => {
    setIssueList(issueList.filter(issue => issue.id !== id));
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
          {issueList.map((issue, index) => (
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
                        issueList.filter(
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
