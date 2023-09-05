import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

type Props = {
  children?: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <Box>{children}</Box>
      {/* <Footer /> */}
    </>
  );
};

export default ClientLayout;
