"use client";

import { Checkbox, Button, Stack, Box, Text } from "@mantine/core";

type Props = {
  onSubmit: () => Promise<void>;
  items: {
    label: string;
    value: string;
  }[];
  selectedItems: string[];
  updateSelectedItems: (items: string[]) => void;
};

export const SearchForm = ({
  onSubmit,
  items,
  selectedItems,
  updateSelectedItems,
}: Props) => {
  const handleSubmit = async () => {
    await onSubmit();
  };

  const handleChange = (value: string, checked: boolean) => {
    updateSelectedItems(
      checked
        ? [...selectedItems, value]
        : selectedItems.filter((item) => item !== value)
    );
  };

  return (
    <Box bg="gray.1" p="md" style={{ borderRadius: "8px" }}>
      <Text mb="md" size="lg" fw="bold">
        Search Form
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Stack>
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {items.map((item) => (
              <Checkbox
                key={item.value}
                label={item.label}
                checked={selectedItems.includes(item.value)}
                onChange={(event) =>
                  handleChange(item.value, event.currentTarget.checked)
                }
              />
            ))}
          </Box>
          <Button size="md" w="fit-content" m="auto" type="submit">
            検索
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
