import { Box } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <>
      <Box>{children}</Box>
    </>
  );
};

export default ClientLayout;
