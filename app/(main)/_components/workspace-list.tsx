"use client";

import { useParams, useRouter } from "next/navigation";

import { Item } from "./item";

export const WorkspaceList = ({ n }: { n: number }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      {new Array(n).fill("").map((_, i) => (
        <Item
          active={params.workspaceId === String(i)}
          key={i}
          label={`Workspace ${i + 1}`}
          onClick={() => router.push(`/dashboard/${i}`)}
        />
      ))}
    </div>
  );
};
