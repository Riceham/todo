"use client";

import { useParams, useRouter } from "next/navigation";

import { WORKSPACES } from "@/constants";

import { Item } from "./item";

export const WorkspaceList = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      {WORKSPACES.map(({ id, name }) => (
        <Item
          active={params.workspaceId === id}
          key={id}
          label={name}
          onClick={() => router.push(`/dashboard/${id}`)}
        />
      ))}
    </div>
  );
};
