"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Popconfirm,
  Space,
  Form,
  Breadcrumb,
} from "antd";
import AddExterior from "@/components/AddExterior";
import withAuth from "@/components/common/withAuth";
import { useAxo } from "../../services/helpers/api";
import { API } from "../../services/constant";
import { useAppSelector } from "@/redux/hooks";
import { putFileToS3, removeFileToS3 } from "@/services/s3Service";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import Link from "next/link";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const iconProps = {
  rev: undefined,
};

const ExteriorPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const deletePhotes = useRef([]);

  const [typeFields, setTypeFields] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);
  const [isModalVisible, setIsModalVisible] = useState({
    modal: false,
    id: null,
  });

  const [{ loading, data }, userExteriorPost] = useAxo(
    "post",
    API.USER_EXTERIOR
  );

  useEffect(() => {
    if (user?.id) {
      userExteriorPost({ userId: user?.id });
    }
  }, [user?.id]);

  const handleAddModalOpen = (id = null) => {
    setIsModalVisible({ id, modal: true });
  };

  const handleAddModalClose = (reset = false) => {
    setIsModalVisible({ id: null, modal: false });

    if (reset) {
      form.resetFields();
      setTypeFields([]);
      deletePhotes.current = [];
    }
  };

  const deleteItem = async (item: any) => {
    const forImages = JSON.parse(item?.typeField);
    const deleteimages: any = [];

    Object.entries(forImages).forEach(([_, value]: any) => {
      deleteimages.push(value.ProjectPhotos, value.WarrantyPhotos);
    });

    try {
      await userExteriorPost({ userId: user?.id, deleteId: item?.id });

      if (!!deleteimages.length) {
        deleteimages?.forEach((t: any) => {
          removeFileToS3(t);
        });
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  const editItem = (item: any) => {
    const parseData = updateData(JSON.parse(item?.typeField));
    setTypeFields(
      Object.keys(parseData)?.map((t: any) => ({
        title: t,
        name: t,
      }))
    );

    form.setFieldsValue({ name: item?.name, type: item.type, ...parseData });
    handleAddModalOpen(item?.id);
  };

  const handleOnFinish = async () => {
    try {
      setLoader(true);
      const { name, type, ...rest } = await form.validateFields();

      const updatedData = await uploadImages(rest);

      if (!!deletePhotes.current.length) {
        deletePhotes.current?.forEach((t: any) => {
          removeFileToS3(t);
        });
      }

      const payload = {
        id: isModalVisible?.id,
        userId: user.id,
        name,
        type,
        typeField: JSON.stringify(updatedData),
      };

      await userExteriorPost(payload);
      handleAddModalClose(true);
    } catch (err) {
      console.log("err:", err);
    } finally {
      setLoader(false);
    }
  };

  const columns: any = [
    {
      title: "Rooms",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      key: "action",
      align: "right",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => editItem(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this room?"
            onConfirm={() => deleteItem(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <Link href="/">
                <Space>
                  <HomeOutlined {...iconProps} />
                  Home
                </Space>
              </Link>
            ),
          },
          {
            title: "Exterior",
          },
        ]}
      />

      <div className="flex justify-between my-4">
        <Button
          onClick={() => router.push("/")}
          icon={<ArrowLeftOutlined {...iconProps} />}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={() => handleAddModalOpen(null)}
          disabled={loading}
        >
          Add Exterior
        </Button>
      </div>

      <Table
        dataSource={(data || [])?.map((t: any, i: any) => ({ ...t, key: i }))}
        columns={columns}
        loading={loading || loader}
      />

      <Modal
        title={!isModalVisible?.id ? "Add Room/Hallway" : "Edit Room/Hallway"}
        open={isModalVisible?.modal}
        className="top-[20px]"
        closable={false}
        width={700}
        footer={[
          <Button
            key="cancel"
            onClick={() => handleAddModalClose(!!isModalVisible?.id)}
            disabled={loading || loader}
          >
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleOnFinish}
            loading={loading || loader}
          >
            {!isModalVisible?.id ? "Save" : "Update"}
          </Button>,
        ]}
      >
        <AddExterior
          form={form}
          typeFields={typeFields}
          setTypeFields={setTypeFields}
          deletePhotes={deletePhotes}
        />
      </Modal>
    </div>
  );
};

export default withAuth(ExteriorPage);

const uploadImages = async (data: any) => {
  const updatedData = { ...data };

  for (const key in updatedData) {
    if (!updatedData.hasOwnProperty(key)) continue;

    const handlePhotos = async (type: string, photos: any[]) => {
      const clonedPhotos = structuredClone(
        photos?.map((photo: any) => ({
          originFileObj: photo?.originFileObj,
          uid: photo?.uid,
        }))
      );

      if (!!clonedPhotos?.length) {
        updatedData[key][type] = [];
        for (const t of clonedPhotos) {
          if (t?.originFileObj) {
            const keyPicture = `EXTERIOR/${uuidv4()}.webp`;
            updatedData[key][type].push(keyPicture);
            await putFileToS3(keyPicture, t.originFileObj);
          } else {
            updatedData[key][type].push(t.uid);
          }
        }
      }
    };

    await handlePhotos("ProjectPhotos", updatedData[key]?.ProjectPhotos || []);
    await handlePhotos(
      "WarrantyPhotos",
      updatedData[key]?.WarrantyPhotos || []
    );
  }

  return updatedData;
};

const updateData = (data: any) => {
  return Object.entries(data).reduce((acc: any, [key, value]: any) => {
    acc[key] = {
      ...value,
      InstallDate: value.InstallDate ? dayjs(value.InstallDate) : undefined,

      ProjectPhotos: value?.ProjectPhotos
        ? value?.ProjectPhotos?.map((t: any) => ({
            uid: t,
            name: "Picture",
            status: "done",
            url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
          }))
        : undefined,

      WarrantyPhotos: value?.WarrantyPhotos
        ? value?.WarrantyPhotos?.map((t: any) => ({
            uid: t,
            name: "Picture",
            status: "done",
            url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
          }))
        : undefined,
    };
    return acc;
  }, {});
};
