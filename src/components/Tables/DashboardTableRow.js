/*!

   

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

function DashboardTableRow(props) {
  const { logo, name, members, budget, progression, lastItem } = props
  const textColor = useColorModeValue('gray.700', 'white')
  return (
    <Tr>
      <Td
        minWidth={{ sm: '250px' }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? 'none' : null}>
        <Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Icon as={logo} h={'24px'} w={'24px'} me='18px' />
          <Text fontSize='sm' color='#fff' fontWeight='normal' minWidth='100%'>
            {name}
          </Text>
        </Flex>
      </Td>

      <Td borderBottomColor='#56577A' border={lastItem ? 'none' : null}>
        <AvatarGroup size='xs' >
          {members.map((member, index) => {
            return (
              <Avatar
                key={member.id} 
                name='Ryan Florence'
                src={member}
                
                border='none'
                _hover={{ zIndex: '3', cursor: 'pointer' }}
              />
            )
          })}
        </AvatarGroup>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? 'none' : undefined}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {budget}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? 'none' : undefined}>
        <Flex direction='column'>
          <Text
            fontSize='sm'
            color='#fff'
            fontWeight='bold'
            pb='.2rem'>{`${progression}%`}</Text>
          <Progress
            colorScheme='brand'
            height='3px'
            bg='#2D2E5F'
            value={progression}
            borderRadius='30px'
          />
        </Flex>
      </Td>
    </Tr>
  )
}

export default DashboardTableRow
