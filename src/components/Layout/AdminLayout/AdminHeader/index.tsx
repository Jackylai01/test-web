import { Flex } from '@chakra-ui/react';
import Breadcrumbs from './Breadcrumbs';
import HeaderUser from './HeaderUser';

const AdminHeader = () => {
  return (
    <Flex as='header' justifyContent='space-around'>
      <Breadcrumbs />
      <HeaderUser />
    </Flex>
  );
};

export default AdminHeader;
