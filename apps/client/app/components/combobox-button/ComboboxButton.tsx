import { Button, Combobox, Flex, Text, useCombobox } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { PiCards, PiCheck } from "react-icons/pi";

export type ComboboxButtonProps = {
  defaultSelected?: string[];

  items: string[];
  onItemRender: (item: string) => React.ReactNode;
  onItemSelect?: (item: string) => void;
  onItemDeselect?: (item: string) => void;

  children: (selectedItems: string[]) => React.ReactNode;
};

export const ComboboxButton = ({
  defaultSelected,
  items,
  onItemRender,
  onItemSelect,
  onItemDeselect,
  children,
}: ComboboxButtonProps) => {
  const [search, setSearch] = useState("");
  const [searchDebounced] = useDebounce(search, 500);

  const [selectedItems, setSelectedValues] = useState<string[]>(defaultSelected ?? []);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
      combobox.updateSelectedOptionIndex("active");
    },
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.includes(searchDebounced));
  }, [items, searchDebounced]);

  const handleItemSelect = (value: string) => {
    if (selectedItems.includes(value)) {
      setSelectedValues((prev) => prev.filter((v) => v !== value));
      onItemDeselect?.(value);
    } else {
      setSelectedValues((prev) => [...prev, value]);
      onItemSelect?.(value);
    }
  };

  return (
    <Combobox
      store={combobox}
      width={250}
      position="bottom-start"
      onOptionSubmit={handleItemSelect}
    >
      <Combobox.Target withAriaAttributes={false}>
        <Button
          w={75}
          variant="light"
          leftSection={<PiCards size="18px" />}
          onClick={() => {
            combobox.toggleDropdown();
          }}
        >
          {children(selectedItems)}
        </Button>
      </Combobox.Target>
      <Combobox.Dropdown mah="300px">
        <Combobox.Search
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search"
        />
        <Combobox.Options>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isSelected = selectedItems.includes(item);

              return (
                <Combobox.Option key={item} value={item} active={isSelected}>
                  <Flex direction="row" gap="xs" align="center">
                    {isSelected ? <PiCheck /> : null}
                    {onItemRender(item)}
                  </Flex>
                </Combobox.Option>
              );
            })
          ) : (
            <Combobox.Empty>No data</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
