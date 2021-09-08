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

function Issues(): JSX.Element {
  const [newIssue, setNewIssue] = useState('');
  const [issueList, setIssueList] = useState(Array<string>());
  const [isEditing, setIsEditing] = useState(false);
  const [currentIssue, setCurrentIssue] = useState({ value: '', index: NaN });
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
    tempList[currentIssue.index] = currentIssue.value;
    setIssueList(tempList);
    setIsEditing(false);
  };

  return (
    <>
      <h2 className="lobby-title">Issues</h2>
      {isEditing ? (
        <form
          className="issue_container"
          id="lobby-input_edit-issue"
          onSubmit={editIssue}
        >
          <Input
            value={currentIssue.value}
            type="text"
            className="new-issue_input"
            onChange={event =>
              setCurrentIssue({
                value: event.target.value,
                index: currentIssue.index,
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
      <div className="issue_container">
        {issueList.map((el, index) => (
          <div className="issue-item" key={uuidv4()}>
            {el}
            <div>
              <EditOutlined
                className="edit-issue_icon"
                onClick={() => {
                  setCurrentIssue({ value: el, index });
                  setIsEditing(true);
                }}
              />
              <DeleteOutlined
                className="delete-issue_icon"
                color="red"
                onClick={() => {
                  setIssueList(issueList.filter((val, i) => i !== index));
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Issues;
