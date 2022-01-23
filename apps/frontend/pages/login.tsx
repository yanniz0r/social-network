import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import Button from "../components/button";
import Card from "../components/card";
import { useLoginPageQuery } from "../graphql/generated";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const loginPageQuery = useLoginPageQuery({
    variables: {
      googleRedirectURL: "http://localhost:3000/register/google",
    },
  });
  return (
    <div className="p-10">
      <Card className="p-10">
        <h1 className="mb-4 text-3xl text-gray-100">Anmelden</h1>
        <Button
          onClick={() => router.push(loginPageQuery.data?.googleOAuthURL!)}
          iconStart={<FaGoogle />}
        >
          Mit Google anmelden
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
