import { useParams } from "react-router-dom";

export default function CatInfo() {
  const { catID } = useParams();
  return <>Cat ID: {catID}</>;
}
