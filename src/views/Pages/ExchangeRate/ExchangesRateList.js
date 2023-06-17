import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import TableCrud from 'components/TableCrud/TableCrud'
import GradientBorder from 'components/GradientBorder/GradientBorder'
import { StyledFormLabel, StyledSelect } from 'components/ReusableComponents/ReusableComponents'
import { useGetCurrencyTypes } from 'graphql/currencies/crudCurrencies'

import ColumnsComponent from './ColumnsComponent'
import useExchangeRateFactory from './useExchangeRate'

export default function ExchangesRateList() {
  const [selectedCurrency, setSelectedCurrency] = useState(null)
  const { data: currenciesData = {}, loading: currenciesLoading, error: currenciesError } = useGetCurrencyTypes()
  const currencies = currenciesData?.getAllCurrencyTypes || []

  useEffect(() => {
    if (currencies.length > 0 && selectedCurrency === null) {
      setSelectedCurrency(currencies[0].id)
    }
  }, [currencies])

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value)
  }

  const useExchangeRate = useExchangeRateFactory(selectedCurrency)

  return (
    <GradientBorder p="2px">
      <Flex
        background="transparent"
        borderRadius="30px"
        w="100%"
        bg={{ base: 'rgb(19,21,56)' }}
        direction="column"
        pt={{ base: '120px', md: '75px' }}
      >
        <Box ml="4">
          <StyledFormLabel>Monedas</StyledFormLabel>
          <StyledSelect  w="95%" value={selectedCurrency} onChange={handleCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name}
              </option>
            ))}
          </StyledSelect>
        </Box>
        {selectedCurrency && <TableCrud useCustomHook={useExchangeRate} ColumnsComponent={ColumnsComponent} />}
      </Flex>
    </GradientBorder>
  )
}
