"use client";

import { getPosts } from "../actions/getPosts";
import { Button } from "@mantine/core";
import { DefaultLayout } from "~/components/layouts/DefaultLayout";

export default function Home() {
  const handleFetchData = async () => {
    const data = await getPosts();
    console.log(data);
  };

  return (
    <DefaultLayout>
      <h1>Hello World</h1>
      <Button onClick={handleFetchData}>fetch data</Button>
    </DefaultLayout>
  );
}
