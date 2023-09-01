import { AtSignIcon, CalendarIcon, Icon } from '@chakra-ui/icons';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { allAdminRouter } from '@fixtures/admin-router';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = () => {
  const router = useRouter();
  const displayValue = useBreakpointValue({
    base: 'none',
    md: 'none',
    lg: 'flex',
  });
  const breadcrumbsRouter = router.asPath
    .split('?')[0]
    .split('/')
    .map((routerName) =>
      allAdminRouter.find((router) => router.href === routerName),
    )
    .filter((router) => router);

  let routerLink = '';

  return (
    <Box w='60%' as='ul' alignItems='center' pl='2rem' display={displayValue}>
      {breadcrumbsRouter.map((router, index) => {
        routerLink += `/${router?.href}`;

        return (
          <Box as='li' key={router?.href} p='0.85rem'>
            <Link href={routerLink}>
              <Flex
                as='a'
                className={
                  index !== breadcrumbsRouter.length - 1 ? 'active' : ''
                }
                cursor='pointer'
                alignItems='center'
              >
                <Icon
                  as={router?.href === 'zigong' ? CalendarIcon : AtSignIcon}
                  boxSize='1.5em'
                />
                <Text as='b' fontSize='xl'>
                  {router?.label}
                </Text>
              </Flex>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default Breadcrumbs;
