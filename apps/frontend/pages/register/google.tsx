import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { FaSpinner } from "react-icons/fa";
import Card from "../../components/card";
import { useRegisterGooglePageRegisterMutation as useRegisterMutation } from "../../graphql/generated";

const GoogleRegisterPage: NextPage = () => {
  const router = useRouter();
  const code = useMemo(() => {
    const codeParam = router.query.code;
    if (typeof codeParam === "string") return codeParam;
    return null;
  }, [router.query]);
  const [registerMutation] = useRegisterMutation();

  useEffect(() => {
    if (code) {
      registerMutation({
        variables: {
          code,
          redirectURL: "http://localhost:3000/register/google",
        },
      }).then(() => {
        router.replace("/");
      });
    }
  }, [code]);

  return (
    <div className="p-10">
      <Card className="p-10 text-slate-100 flex flex-col items-center justify-center">
        <FaSpinner className="text-4xl animate-spin" />
        <h1 className="text-2xl text-slate-300 mt-5">
          Anmeldung mit Google läuft...
        </h1>
        <p className="text-slate-400 mt-2">Du wirst gleich weitergeleitet</p>
      </Card>
    </div>
  );
};

export default GoogleRegisterPage;
