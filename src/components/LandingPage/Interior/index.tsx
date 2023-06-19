import React, { useEffect } from "react";

import { API } from "@/services/constant";
import { useAxo } from "@/services/helpers/api";
import { useAppSelector } from "@/redux/hooks";
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Interior = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);

  const [{ loading, data }, userFloorPost] = useAxo("post", API.USER_FLOORS);

  useEffect(() => {
    if (user?.id) {
      userFloorPost({ userId: user?.id });
    }
  }, [user?.id]);

  const columns: any = [
    {
      title: <span className="font-extrabold text-18">House Levels</span>,
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <Link href={`/levels/${record?.id}`}>{record?.name}</Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end my-4">
        <Button
          type="primary"
          onClick={() => {
            router.push("/levels");
          }}
          disabled={loading}
        >
          Add Interior
        </Button>
      </div>
      <Table
        dataSource={(data || [])?.map((t: any, i: any) => ({ ...t, key: i }))}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default Interior;
