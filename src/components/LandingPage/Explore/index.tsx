"use client";

import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Popconfirm, Space, Form } from "antd";
import AddExplore from "@/components/AddExplore";
import { useAxo } from "@/services/helpers/api";
import {
  API,
  typeDetailExterior,
  typeDetailRoom,
  typeDetailUtilitie,
} from "@/services/constant";
import { useAppSelector } from "@/redux/hooks";
import { putFileToS3, removeFileToS3 } from "@/services/s3Service";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "@/services/helpers";

const Explore = ({ role }: any) => {
  const [form] = Form.useForm();
  const { user } = useAppSelector((state: any) => state?.userReducer);

  const deletePhotes = useRef([]);

  const [typeFields, setTypeFields] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);
  const [isModalVisible, setIsModalVisible] = useState({
    modal: false,
    id: null,
  });

  const [{ loading, data }, userExplorePost] = useAxo("post", API.USER_EXPLORE);

  useEffect(() => {
    if (user?.id && role) {
      userExplorePost({ userId: user?.id, role });
    }
  }, [user?.id, role]);

  useEffect(() => {
    if (role === "utilitie") {
      setTypeFields([{ name: "Utilitie", typeDetail: typeDetailUtilitie }]);
    }
  }, [role, isModalVisible]);

  const handleAddModalOpen = (id = null) => {
    setIsModalVisible({ id, modal: true });

    if (!id) {
      form.setFieldsValue({ name: `${role} ${data?.length + 1}` });
    }
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
      deleteimages.push(
        value.Picture,
        value.Receipt,
        value.ProjectPhotos,
        value.WarrantyPhotos
      );
    });

    try {
      await userExplorePost({ userId: user?.id, deleteId: item?.id, role });

      if (deleteimages?.length) {
        deleteimages.forEach((t: any) => {
          if (t?.length) {
            t.forEach((file: string) => {
              removeFileToS3(file);
            });
          }
        });
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  const editItem = (item: any) => {
    const parseData = updateData(JSON.parse(item?.typeField));

    setTypeFields(
      Object.entries(parseData)?.map(([key]: any) => ({
        name: key,
        typeDetail:
          role === "room"
            ? typeDetailRoom
            : role === "exterior"
            ? typeDetailExterior
            : typeDetailUtilitie,
      }))
    );

    form.setFieldsValue({
      name: item?.name,
      brand: item?.brand,
      type: item.type,
      roomLevel: item.roomLevel,
      ...parseData,
    });
    handleAddModalOpen(item?.id);
  };

  const handleOnFinish = async () => {
    try {
      setLoader(true);
      const {
        changeName,
        addFieldName,
        name,
        brand,
        type,
        roomLevel,
        ...rest
      } = await form.validateFields();

      const updatedData = await uploadImages(rest, role);

      if (!!deletePhotes.current.length) {
        deletePhotes.current?.forEach((t: any) => {
          removeFileToS3(t);
        });
      }

      await userExplorePost({
        id: isModalVisible?.id,
        userId: user.id,
        name,
        roomLevel,
        type,
        role,
        brand,
        typeField: JSON.stringify(updatedData),
      });

      handleAddModalClose(true);
    } catch (err) {
      console.log("err:", err);
    } finally {
      setLoader(false);
    }
  };

  const columns: any = [
    {
      title: capitalizeFirstLetter(role),
      dataIndex: "name",
      key: "name",
    },
    ...(role === "room"
      ? [
          {
            title: "Room Level",
            dataIndex: "roomLevel",
            key: "roomLevel",
          },
        ]
      : []),
    ...(role === "room" || role === "exterior"
      ? [
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
        ]
      : []),
    ...(role === "utilitie"
      ? [
          {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
          },
        ]
      : []),
    {
      key: "action",
      align: "right",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => editItem(record)}>
            Edit
          </Button>

          <Popconfirm
            title={`Are you sure to delete this 
            ${capitalizeFirstLetter(role)}?`}
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
      <div className="flex justify-end my-4">
        <Button
          type="primary"
          onClick={() => handleAddModalOpen(null)}
          disabled={loading}
        >
          {`Add ${capitalizeFirstLetter(role)}`}
        </Button>
      </div>

      <Table
        dataSource={(data || [])?.map((t: any, i: any) => ({ ...t, key: i }))}
        columns={columns}
        loading={loading || loader}
      />

      <Modal
        title={
          !isModalVisible?.id
            ? `Add ${capitalizeFirstLetter(role)}/Hallway`
            : `Edit ${capitalizeFirstLetter(role)}/Hallway`
        }
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
        <AddExplore
          form={form}
          typeFields={typeFields}
          setTypeFields={setTypeFields}
          deletePhotes={deletePhotes}
          role={role}
        />
      </Modal>
    </div>
  );
};

export default Explore;

const uploadImages = async (data: any, role: any) => {
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
            const keyPicture = `${role.toUpperCase()}/${uuidv4()}.webp`;
            updatedData[key][type].push(keyPicture);
            await putFileToS3(keyPicture, t.originFileObj);
          } else {
            updatedData[key][type].push(t.uid);
          }
        }
      }
    };

    if (role === "room") {
      await handlePhotos("Picture", updatedData[key]?.Picture || []);
      await handlePhotos("Receipt", updatedData[key]?.Receipt || []);
    } else {
      await handlePhotos(
        "ProjectPhotos",
        updatedData[key]?.ProjectPhotos || []
      );
      await handlePhotos(
        "WarrantyPhotos",
        updatedData[key]?.WarrantyPhotos || []
      );
    }
  }

  return updatedData;
};

interface Data {
  [key: string]: {
    InstallDate?: string;
    Picture?: string;
    Receipt?: string;
    ProjectPhotos?: string[];
    WarrantyPhotos?: string[];
  };
}

const updateData = (data: Data) => {
  const updatedData: any = {};

  for (const [key, value] of Object.entries(data)) {
    const updatedValue: any = {
      ...value,
      InstallDate: value.InstallDate ? dayjs(value.InstallDate) : undefined,
    };

    if (value.Picture) {
      updatedValue.Picture = [
        {
          uid: value.Picture,
          name: `${value.Picture}`,
          status: "done",
          url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${value.Picture}`,
        },
      ];
    }

    if (value.Receipt) {
      updatedValue.Receipt = [
        {
          uid: value.Receipt,
          name: `${value.Receipt}`,
          status: "done",
          url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${value.Receipt}`,
        },
      ];
    }

    if (!!value?.ProjectPhotos?.length) {
      updatedValue.ProjectPhotos = value.ProjectPhotos.map((t: any) => ({
        uid: t,
        name: "Picture",
        status: "done",
        url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
      }));
    }

    if (!!value?.WarrantyPhotos?.length) {
      updatedValue.WarrantyPhotos = value.WarrantyPhotos.map((t: any) => ({
        uid: t,
        name: "Picture",
        status: "done",
        url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
      }));
    }

    updatedData[key] = updatedValue;
  }

  return updatedData;
};
