"use client";

import React, { useState } from "react";
import {
  Button,
  Col,
  Descriptions,
  Input,
  QRCode,
  Row,
  Tabs,
  Typography,
} from "antd";
import withAuth from "@/components/common/withAuth";
import { useAppSelector } from "@/redux/hooks";
import AddHouseImg from "@/components/LandingPage/AddHouseImg";
import EditUserDetails from "@/components/LandingPage/EditUserDetails";
import Explore from "@/components/LandingPage/Explore";

const HomePage = () => {
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState({ image: false, user: false });

  const handleCancel = () => {
    setIsModalOpen({ image: false, user: false });
  };

  const showModal = (type: any) => {
    setIsModalOpen({ ...isModalOpen, ...type });
  };

  let link: any = "";
  if (typeof window !== "undefined") {
    link = `${window?.location?.origin}/registration?street=${user?.street}&city=${user?.city}&state=${user?.state}&zipCode=${user?.zipCode}&contractorCode=${user?.contractorCode}&recieverEmail=${user?.recieverEmail}`;
  }

  const items: any = [
    {
      key: "1",
      label: `Interior`,
      children: <Explore role={"room"} />,
    },
    {
      key: "2",
      label: `Exterior`,
      children: <Explore role={"exterior"} />,
    },
    {
      key: "3",
      label: `Utilities`,
      children: <Explore role={"utilitie"} />,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <Title level={3}>User Inforamtion</Title>
          <Button
            onClick={() => {
              showModal({ user: true });
            }}
          >
            Edit User
          </Button>
          <EditUserDetails
            user={user}
            open={isModalOpen?.user}
            handleCancel={handleCancel}
          />
        </div>

        <Row>
          <Col
            span={18}
            xs={{ order: 2, span: 24 }}
            sm={{ order: 1, span: 18 }}
          >
            <Descriptions>
              <Descriptions.Item label="UserName">{`${user?.firstName} ${user?.lastName}`}</Descriptions.Item>
              <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
              <Descriptions.Item label="City">{user?.city}</Descriptions.Item>
              <Descriptions.Item label="State">{user?.state}</Descriptions.Item>
              <Descriptions.Item label="Street">
                {user?.street}
              </Descriptions.Item>
              <Descriptions.Item label="ZipCode">
                {user?.zipCode}
              </Descriptions.Item>
              <Descriptions.Item label="Contractor Code">
                {user?.contractorCode}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={6} xs={{ order: 1, span: 24 }} sm={{ order: 2, span: 6 }}>
            <div className="flex justify-center flex-col items-center mb-4 gap-2">
              <QRCode value={link} size={250} />
              <Input maxLength={60} value={link} readOnly />
            </div>
          </Col>
        </Row>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <Title level={3}>House Image</Title>
          <Button
            onClick={() => {
              showModal({ image: true });
            }}
          >
            Add Image
          </Button>
          <AddHouseImg
            user={user}
            open={isModalOpen?.image}
            handleCancel={handleCancel}
          />
        </div>
        {user?.image && (
          <img
            src={`https://real-estate-1.s3.us-east-2.amazonaws.com/${
              user?.image
            }?${Math.random()}`}
            alt=""
            width={"100%"}
            height={500}
            className="object-contain rounded"
          />
        )}
      </div>
      <div className="min-h-[50vh]">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default withAuth(HomePage);
