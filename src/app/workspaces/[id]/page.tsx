import React from "react";

interface Props {
  params: {
    id: string;
  };
}
const page = ({ params }: Props) => {
  return <div>page: {params.id}</div>;
};

export default page;
