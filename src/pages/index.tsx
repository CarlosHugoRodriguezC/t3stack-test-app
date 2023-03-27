import { MainLayout } from "@/components/layouts";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

const HomePage = () => {
  return <MainLayout title={"Process Of | Home"}></MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ctx});
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default HomePage;
