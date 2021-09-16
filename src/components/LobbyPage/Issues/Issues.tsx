import * as React from 'react';
import { Button, Input } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons/lib/icons';
import { FormEvent, useState } from 'react';
import './issues.css';
import { v4 as uuidv4 } from 'uuid';

type IssuesPropsType = {
  issueList: string[];
  setIssueList: React.Dispatch<React.SetStateAction<string[]>>;
  editable?: boolean;
  onIssueClick?: (issue: string) => void;
  currentIssue?: string | null;
};

const Issues: React.FunctionComponent<IssuesPropsType> = ({
  issueList,
  setIssueList,
  editable = true,
  onIssueClick,
  currentIssue,
}) => {
  const [newIssue, setNewIssue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({ value: '', index: NaN });

  const addIssue = (event: FormEvent) => {
    event.preventDefault();
    if (newIssue.length > 0) {
      setIssueList([...issueList, newIssue]);
      setNewIssue('');
    }
  };

  const editIssue = (event: FormEvent) => {
    event.preventDefault();
    const tempList = issueList;
    tempList[currentItem.index] = currentItem.value;
    setIssueList(tempList);
    setIsEditing(false);
  };

  return (
    <div className="issues">
      <h2 className="lobby-title">Issues</h2>
      {isEditing ? (
        <form
          className="issue_container"
          id="lobby-input_edit-issue"
          onSubmit={editIssue}
        >
          <Input
            value={currentItem.value}
            type="text"
            className="new-issue_input"
            onChange={event =>
              setCurrentItem({
                value: event.target.value,
                index: currentItem.index,
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
          className="issue_container "
          id="lobby-input_add-issue"
          onSubmit={addIssue}
        >
          <Input
            value={newIssue}
            type="text"
            className="new-issue_input"
            placeholder="add new issue"
            onChange={event => setNewIssue(event.target.value)}
          />
          <Button
            className="add-issue_btn"
            type="default"
            htmlType="submit"
            icon={<PlusOutlined className="new-issue_icon" />}
          />
        </form>
      )}
      <ul className="issue_container">
        {issueList.map((el, index) => (
          <li
            className={`issue-item ${currentIssue === el ? 'current' : ''}`}
            key={uuidv4()}
            onClick={onIssueClick ? () => onIssueClick(el) : undefined}
            role="presentation"
          >
            {el}
            <div>
              {editable && (
                <EditOutlined
                  className="edit-issue_icon"
                  onClick={() => {
                    setCurrentItem({ value: el, index });
                    setIsEditing(true);
                  }}
                />
              )}
              <DeleteOutlined
                className="delete-issue_icon"
                color="red"
                onClick={() => {
                  setIssueList(issueList.filter((val, i) => i !== index));
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Issues;
