import { Button, Flex, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { MetaFunction } from "@remix-run/node";
import { CreateModuleModal, ModulesView, useModules } from "~/features/modules";

export const meta: MetaFunction = () => {
  return [{ title: "Modules" }];
};

export default function Modules() {
  const modules = useModules();

  const [isCreateModuleModalOpen, { close: closeCreateModuleModal, open: openCreateModuleModal }] =
    useDisclosure(false);

  return (
    <Flex direction="column" gap="lg">
      <Button
        mr="auto"
        variant="filled"
        onClick={() => {
          openCreateModuleModal();
        }}
      >
        Create module
      </Button>
      <Paper p="sm" bg="dark.8">
        {modules.isSuccess && <ModulesView modules={modules.data} />}
      </Paper>
      <CreateModuleModal opened={isCreateModuleModalOpen} close={closeCreateModuleModal} />
    </Flex>
  );
}
