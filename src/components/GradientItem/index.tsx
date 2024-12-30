// import { IconColorSwatch } from "@tabler/icons-react";
import { Paper, Text } from "@mantine/core";
import classes from "./index.module.css";

type Props = {
  title: string;
  description: string;
  href: string;
};

export function GradientItem({ title, description, href }: Props) {
  return (
    <Paper
      component="a"
      href={href}
      target="_blank"
      withBorder
      radius="md"
      className={classes.card}
    >
      {/* <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{ deg: 0, from: "pink", to: "orange" }}
      >
        <IconColorSwatch size={28} stroke={1.5} />
      </ThemeIcon> */}
      <Text
        style={{
          wordBreak: "break-all",
        }}
        size="xl"
        fw={500}
        lineClamp={1}
      >
        {title}
      </Text>
      <Text
        style={{
          wordBreak: "break-all",
        }}
        size="sm"
        mt="sm"
        c="dimmed"
        lineClamp={2}
      >
        {description}
      </Text>
    </Paper>
  );
}
