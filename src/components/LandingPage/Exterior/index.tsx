import React, { useEffect } from "react";

import { API } from "@/services/constant";
import { useAxo } from "@/services/helpers/api";
import { useAppSelector } from "@/redux/hooks";
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";

const Exterior = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);

  const [{ loading, data }, userExteriorPost] = useAxo(
    "post",
    API.USER_EXTERIOR
  );

  useEffect(() => {
    if (user?.id) {
      userExteriorPost({ userId: user?.id });
    }
  }, [user?.id]);

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
  ];

  return (
    <div>
      <div className="flex justify-end my-4">
        <Button
          type="primary"
          onClick={() => {
            router.push("/exterior");
          }}
        >
          Add Exterior
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

export default Exterior;
