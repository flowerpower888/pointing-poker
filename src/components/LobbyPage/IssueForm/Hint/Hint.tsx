import React, { FC } from 'react';

const Hint: FC = () => (
  <div className="issue_form__popover">
    <p>
      Click <strong>Upload</strong> button. Upload your .json file.
    </p>
    <div>
      <p className="issue-form__text">Structure your file:</p>
      <pre>
        <code>
          {`[
    {
      "title": string,
      "link"?: string,
      "priority": "low" | "medium" | "high"
    }
  ]`}
        </code>
      </pre>
    </div>
    <p className="issue-form__text">Example:</p>
    <div>
      <pre>
        <code>
          {`[
    {
      "title": "issue1",
      "priority": "low"
    },
    {
      "title": "issue2",
      "link": "www.issue2.com",
      "priority": "medium"
    }
  ]`}
        </code>
      </pre>
    </div>
    <div className="issue_form__link">
      <a href="/example.json" download>
        Download example
      </a>
    </div>
  </div>
);

export default Hint;
