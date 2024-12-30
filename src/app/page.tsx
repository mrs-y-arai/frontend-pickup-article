"use client";

import { useState } from "react";
import { getPosts } from "../actions/getPosts";
import { Title, List, Text, LoadingOverlay } from "@mantine/core";
import { DefaultLayout } from "~/components/layouts/DefaultLayout";
import { SearchForm } from "~/components/SearchForm";
import { GradientItem } from "~/components/GradientItem";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [posts, setPosts] = useState<
    {
      title: string;
      description: string;
      href: string;
    }[]
  >([]);

  const handleFetchData = async () => {
    setIsLoading(true);
    const data = await getPosts(selectedItems);
    setPosts(() => Array.from(data.values()));
    setIsLoading(false);
  };

  return (
    <DefaultLayout>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Title
          style={{
            textAlign: "center",
          }}
          mb="md"
        >
          Frondend Tech Articles
        </Title>
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <SearchForm
            onSubmit={handleFetchData}
            items={[
              { label: "React", value: "react" },
              { label: "Next.js", value: "nextjs" },
              { label: "TypeScript", value: "typescript" },
              { label: "Vue", value: "vue" },
              { label: "Nuxt", value: "nuxt" },
            ]}
            selectedItems={selectedItems}
            updateSelectedItems={setSelectedItems}
          />
        </div>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center" }}>記事がありません</div>
        ) : (
          <>
            <Text mb="md" c="dimmed" ta="center">
              {posts.length}記事見つかりました
            </Text>
            <List spacing="lg">
              {posts.map((post) => (
                <List.Item key={post.href}>
                  <GradientItem
                    title={post.title}
                    description={post.description}
                    href={post.href}
                  />
                </List.Item>
              ))}
            </List>
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
