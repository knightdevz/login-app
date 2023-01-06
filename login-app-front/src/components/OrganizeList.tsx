import React, { useState, useEffect } from "react";

import { getCurrentUser } from "../services/auth.service";
import { getOrganizeList } from "../services/organize.service";
import EventBus from "../common/EventBus";

const OrganizeList: React.FC = () => {
  const [content, setContent] = useState<[]>([]);
  const currentUser = getCurrentUser();
  useEffect(() => {
    getOrganizeList().then(
      (response) => {
        setContent(response.data.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {content?.length !== 0 ? (
            content?.map((row: any, index: any): any => {
              return (
                <tr>
                  <td>{row?.id}</td>
                  <td>
                    {row?.name?.substring?.(0, 60)}
                    {row?.name?.length > 60 && "..."}
                  </td>
                  <td>{row?.rec_status === 1 ? "Active" : "Inactive"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizeList;
