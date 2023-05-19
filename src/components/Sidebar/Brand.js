import React from 'react'
import { Box, Link, Text, Image } from '@chakra-ui/react'
import { Separator } from 'components/Separator/Separator'
import logo from 'assets/img/icon.png' // Asegúrate de que la ruta sea la correcta

const Brand = ({ logoText }) => {
  return (
    <Box pt={'25px'} mb='12px'>
      <Link
        href={`${process.env.PUBLIC_URL}/#/`}
        target='_blank'
        display='flex'
        lineHeight='100%'
        mb='30px'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        fontSize='11px'
      >
        <Image src={logo} width="48px" height="48px" alt="Logo" me='10px' mt='2px' /> 
        <Box
          bg='linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)'
          bgClip='text'
        >
          <Text fontSize='sm' letterSpacing='3px' mt='3px' color='transparent'>
            {logoText}
          </Text>
        </Box>
      </Link>
      <Separator></Separator>
    </Box>
  )
}

export default Brand

