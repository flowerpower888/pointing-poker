import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import './uploadAvatar.scss';

type UploadAvatarPropsType = {
  setImageFile: React.Dispatch<React.SetStateAction<Blob | null>>;
};

const UploadAvatar: React.FunctionComponent<UploadAvatarPropsType> = ({
  setImageFile,
}) => (
  <ImgCrop rotate>
    <Upload
      name="avatar"
      listType="picture"
      className="upload-list-inline"
      accept="image/*"
      multiple={false}
      maxCount={1}
      beforeUpload={() => false}
      onChange={(info: UploadChangeParam<UploadFile>) => {
        setImageFile(
          info.file.status === 'removed'
            ? null
            : (info.file as unknown as Blob),
        );
      }}
    >
      <Button icon={<PlusOutlined />}>Upload image</Button>
    </Upload>
  </ImgCrop>
);

export default UploadAvatar;
