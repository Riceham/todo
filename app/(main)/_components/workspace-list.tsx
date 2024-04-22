import { Item } from "./item";

export const WorkspaceList = ({ n }: { n: number }) => {
  return (
    <div>
      {new Array(n).fill("").map((_, i) => (
        <Item key={i} label={`Workspace ${i + 1}`} onClick={() => {}} />
      ))}
    </div>
  );
};
