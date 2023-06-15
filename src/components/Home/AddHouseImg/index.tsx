"use client";

import React, { useEffect, useState } from "react";
import { Form, Modal, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { putFileToS3 } from "@/services/s3Service";
import { useAxo } from "@/services/helpers/api";
import { API } from "@/services/constant";

const iconProps = {
  rev: undefined,
};

const AddHouseImg = ({ user, handleCancel, open }: any) => {
  const [form] = Form.useForm();
  const [{}, userDetailsPost] = useAxo("post", API.USER_DETAILS);
  const [loading, setLoading] = useState(false);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (user?.image) {
      form.setFieldsValue({
        houseImg: [
          {
            uid: "-1",
            name: `${user?.name}`,
            status: "done",
            url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${
              user?.image
            }?${Math.random()}`,
          },
        ],
      });
    }
  }, [open]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const value = await form.validateFields();
      const keyPicture = `HOME/${user?.id}.webp`;

      await putFileToS3(keyPicture, value?.houseImg?.[0]?.originFileObj);
      await userDetailsPost({
        id: user?.id,
        userId: user?.id,
        image: keyPicture,
      });
      handleCancel();
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ loading: loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="houseImg"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <Upload maxCount={1} listType="picture-card" onPreview={() => false}>
            <Space>
              <PlusOutlined {...iconProps} />
              Upload
            </Space>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddHouseImg;
