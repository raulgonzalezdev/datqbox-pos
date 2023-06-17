import React, { useState, useEffect, useCallback } from 'react'
import { useGetProducts } from 'graphql/products/crudProducts'
import { useGetCategories } from 'graphql/category/crudCategory'
import { useGetPaymentMethods } from 'graphql/PaymentMethods/PaymentMethods'

export default function useProducts(rows, setRows, updateTotal) {
  const { loading: loadingProducts, data: productsData } = useGetProducts()
  const { loading: loadingCategories, data: categoriesData } = useGetCategories()
 
  
  const [products, setProducts] = useState([])

  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [foundProducts, setFoundProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')



  useEffect(() => {
    if (productsData && productsData.products) {
      setProducts(productsData.products)
      setFilteredProducts(productsData.products)
    }
    if (categoriesData && categoriesData.categories) {
      setCategories(categoriesData.categories)
    }
  }, [productsData, categoriesData])

  const handleSearchChange = useCallback((event) => {
    setSearchValue(event.target.value)
    if (event.target.value === '') {
      setFilteredProducts(products)
    } else {
      const lowerCaseQuery = event.target.value.toLowerCase()
      const filteredData = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseQuery)
      )
      setFilteredProducts(filteredData)
    }
  }, [products])
  
  const findProductByIdOrSKU = useCallback((idOrSKU) => {
    return products.find((product) => product.id === idOrSKU || product.sku === idOrSKU)
  }, [products])

  const searchProduct = useCallback((query) => {
    const lowerCaseQuery = query.toLowerCase()
    return products.filter((product) => {
      for (const property in product) {
        if (
          typeof product[property] === 'string' &&
          property !== 'id' &&
          property !== 'sku' &&
          product[property].toLowerCase().includes(lowerCaseQuery)
        ) {
          return true
        }
      }
      return false
    })
  }, [products])

  const handleProductSelect = useCallback((productData) => {
    const productIndex = rows.findIndex((row) => row.id === productData.id)

    if (productIndex !== -1) {
      const newRows = [...rows]
      newRows[productIndex].cant++
      setRows(newRows)
      updateTotal(newRows)
    } else {
      const newRow = { ...productData, cant: 1 }
      setRows([...rows, newRow])
      updateTotal([...rows, newRow])
    }

    setSelectedProduct(productData)
  }, [rows, setRows, updateTotal])

  const handleProductsData = useCallback((productsData) => {
    setProducts(productsData)
  }, [])

  return {
    products,
    loadingProducts,
    selectedProduct,
    foundProducts,
    setFoundProducts,
    findProductByIdOrSKU,
    searchProduct,
    handleProductSelect,
    handleProductsData,
    loadingCategories,
    categories,
    setCategories,
    searchValue,
    handleSearchChange,
    filteredProducts
  }
}
