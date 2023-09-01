import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ADMIN_ROUTE } from '@fixtures/constants';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  adminDetailUserProfileAsync,
  adminLogoutAsync,
} from '@reducers/admin/auth/actions';
import Link from 'next/link';
import { useEffect } from 'react';

const HeaderUser = () => {
  const dispatch = useAppDispatch();
  const {
    userProfile,
    status: { adminDetailUserProfileLoading },
  } = useAppSelector((state) => state.adminAuth);
  const rwdSize = useBreakpointValue({ base: 'sm', md: 'md' });

  useEffect(() => {
    if (adminDetailUserProfileLoading) return;
    dispatch(adminDetailUserProfileAsync());
  }, []);

  const handleLogout = () => {
    dispatch(adminLogoutAsync());
  };

  return (
    <Flex
      as='nav'
      p='10px'
      alignItems='center'
      justifyContent='flex-end'
      zIndex={500}
    >
      <HStack spacing='20px'>
        <Avatar src='' size={rwdSize}></Avatar> {/**這裡userInfo 要傳照片 */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {userProfile?.name}
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href={`/${ADMIN_ROUTE}/admin-profile`}>編輯帳號</Link>
            </MenuItem>
          </MenuList>
        </Menu>
        <Link href={`/${ADMIN_ROUTE}/auth/login`}>
          <Button colorScheme='purple' size={rwdSize} onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      </HStack>
    </Flex>
  );
};

export default HeaderUser;
