import { Container } from "@mantine/core";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container py="xl">{children}</Container>;
};
