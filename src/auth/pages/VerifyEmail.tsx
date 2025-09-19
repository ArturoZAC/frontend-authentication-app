import { useParams } from "react-router";

export const VerifyEmail = () => {
  const { codeVerification } = useParams();

  console.log({ codeVerification });

  return <div>VerifyEmail</div>;
};
