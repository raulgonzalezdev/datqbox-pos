import React, { useState, useEffect, useReducer } from 'react'
import {  useToast } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { gql } from '@apollo/client'

import { calculateSalePrice, calculateProfitMargin , formReducer, initialState} from './formReducer'
import useProductDatabase from './useProductDatabase'

export default function useProductForm(productId, onSuccess, onCancel) {

const [formState, setFormState] = useState({
    sizes: [],
    colors: [],
  })

  const [formState, formDispatch] = useReducer(formReducer, initialState)

  const toast = useToast()
  const {
    data,
    loading,
    error,
    createProduct,
    updateProduct,
    addMultipleProductSizes,
    addMultipleProductColors,
    createProductComposite,
    updateProductComposite,
    createProductCosts,
    updateProductCosts,
    addImages,
    removeProductSize,
    removeProductColor,
    createLoading,
    updateLoading,
    createLoadingComposite,
    updateLoadingComposite,
    createLoadingCosts,
    updateLoadingCosts,
  } = useProductDatabase(productId)

  const dbSizes = formState?.productSizes?.map((sizeObj) => sizeObj.size.id) || []
  const dbColors = formState?.productColors?.map((ColorObj) => ColorObj.color.id) || []
  const [selectedSizes, setSelectedSizes] = useState(dbSizes)
  const [selectedColors, setSelectedColors] = useState(dbColors)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedCompositeProducts, setSelectedCompositeProducts] = useState([])
  

  const onImageSelect = (images) => {
    setSelectedImages(images)
  }

  useEffect(() => {
    if (data && data.product) {
      let expirationDate

      if (data.product.expirationDate !== null) {
        const expirationDateMillis = Number(data.product.expirationDate)
        if (!isNaN(expirationDateMillis)) {
          expirationDate = new Date(expirationDateMillis).toISOString().split('T')[0]
        }
      }

      setFormState({
        ...data.product,
        categoryId: data.product.category.id,
        exchangeRateId: data.product.exchangeRate.currencyId,
        purchaseCost: data.product.productCosts ? data.product.productCosts.purchaseCost : 0,
        otherCosts: data.product.productCosts ? data.product.productCosts.otherCosts : 0,
        shippingCost: data.product.productCosts ? data.product.productCosts.shippingCost : 0,
        isTaxedCost: data.product.productCosts  ? data.product.productCosts.isTaxedCost : false,
        calcMethod: data.product.productCosts  ? data.product.productCosts.calcMethod : '',
        taxRateCosts: data.product.productCosts ? data.product.productCosts.taxRateCosts : 0,
        expirationDate: expirationDate,
        featured: data.product.featured === undefined ? true : data.product.featured,
        newarrivals: data.product.newarrivals === undefined ? true : data.product.newarrivals,
      })

      setSelectedSizes(data.product.productSizes.map((productSize) => productSize.size.id))
      setSelectedColors(data.product.productColors.map((productColor) => productColor.color.id))
    } else if (!productId) {
      setFormState({
        id: null,
        name: '',
        vendor: '',
        description: '',
        image: '',
        price: 0,
        inventory: 0,
        rentalType: '',
        featured: true,
        newarrivals: true,
        taxRate: 0,
        taxInclued: true,
        categoryId: '',
        exchangeRateId: '',
        requiresPrescription: true,
        expirationDate: '',
        dosage: '',
        unit: '',
        usageInstructions: '',
        contraindications: '',
        activeIngredient: '',
        shippingCost: 0,
        taxRateCosts: 0,
        otherCosts: 0,
        shippingCost: 0,
        purchaseCost: 0,
        calcMethod: '',
        isTaxedCost: true,
      })
      setSelectedSizes([])
      setSelectedColors([])
    }
  }, [data, productId])

  function handleCostChange(event) {
    const { name, value } = event.target

    setFormState(prevFormState => {
      const updatedFormState = {
        ...prevFormState,
        [name]: value,
      }
      const newSalePrice = calculateSalePrice(
        updatedFormState.purchaseCost, 
        updatedFormState.otherCosts, 
        updatedFormState.shippingCost, 
        updatedFormState.taxRateCosts, 
        updatedFormState.taxRateSale, 
        updatedFormState.profit, 
        updatedFormState.isTaxedCost, 
        updatedFormState.calcMethod
      )

      const newProfitMargin = calculateProfitMargin(
        updatedFormState.price, 
        updatedFormState.purchaseCost, 
        updatedFormState.otherCosts, 
        updatedFormState.shippingCost, 
        updatedFormState.taxRateCosts, 
        updatedFormState.isTaxedCost, 
        updatedFormState.calcMethod
      )
      return {
        ...updatedFormState,
        price: parseFloat(newSalePrice),
        profit: parseFloat(newProfitMargin),
      }
    })
}

  const handleNumberInputChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: Number(value),
    }))
  }

  const UPLOAD_FILES = gql`
    mutation ($files: [Upload!]!) {
      multipleUpload(files: $files) {
        filename
      }
    }
  `
  const token = localStorage.getItem('authToken')
  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql', // Debes reemplazarlo por la URI de tu servidor GraphQL
    headers: {
      'keep-alive': 'true',
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
  })

 const handleAddImages = async (selectedImages, productId) => {
  const isNewFiles = selectedImages.length > 0 && selectedImages[0].hasOwnProperty('path')
  if (isNewFiles) {
      try {
        const imagesWithProduct = selectedImages.map(({ path }) => ({
          url: `http://localhost:4000/uploads/${path}`,
          product: { id: productId },
        }))
        const { data } = await addImages({
          variables: { input: { images: imagesWithProduct } },
        })

        const files = selectedImages.map(({ preview, path }) => {
          return new File([preview], path)
        })
        const uploadPromises = selectedImages.map((file) => {
          return client.mutate({
            mutation: UPLOAD_FILES,
            variables: {
              files: [file],
            },
          })
        })

        const uploadResults = await Promise.all(uploadPromises)
        uploadResults.forEach((result) => {
          console.log(result.data.multipleUpload.filename)
        })
      } catch (error) {
        console.error('Error al añadir imágenes o subir archivos: ', error)
      }
    } else {
      try {
        let imagesProduct = selectedImages.map(({ url }) => ({
          url,
          product: { id: productId },
        }))

        const { data } = await addImages({
          variables: { input: { images: imagesProduct } },
        })

        setSelectedImages([])
      } catch (error) {
        console.error('Error al añadir imágenes: ', error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectedColors = (colorId) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors(selectedColors.filter((id) => id !== colorId))
    } else {
      setSelectedColors([...selectedColors, colorId])
    }
  }

  const handleSelectedSizes = (sizeId, isChecked) => {
    setSelectedSizes((prevSizes) => {
      if (isChecked && !prevSizes.includes(sizeId)) {
        return [...prevSizes, sizeId]
      } else if (!isChecked && prevSizes.includes(sizeId)) {
        return prevSizes.filter((id) => id !== sizeId)
      } else {
        return prevSizes
      }
    })
  }

  const handleAddUpdateCosts = async (id) => {
    let newProductId = id
  
    const adjustedFormState = {
      productId: newProductId,
      shippingCost: parseFloat(formState.shippingCost),
      taxRateCosts: parseFloat(formState.taxRateCosts),
      otherCosts: parseFloat(formState.otherCosts),
      shippingCost: parseFloat(formState.shippingCost),
      purchaseCost: parseFloat(formState.purchaseCost),
      calcMethod: formState.calcMethod,
      isTaxedCost: formState.isTaxedCost,
    }
  
    const existingProductCosts = data.product.productCosts
   
    if (existingProductCosts ) {
     
      let costId = existingProductCosts.id
   
      await updateProductCosts({
        variables: { id: costId, input: adjustedFormState },
      })
      
    } else {
      // existingProductCosts es null, undefined, o un array vacío
     
      await createProductCosts({
        variables: {  input: adjustedFormState },
      })
     }
    
}
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    setIsLoading(true)

    const adjustedFormState = {
      name: formState.name,
      vendor: formState.vendor,
      sku: formState.sku,
      description: formState.description,
      image: formState.image,
      price: parseFloat(formState.price),
      profit: parseFloat(formState.profit),
      inventory: parseFloat(formState.inventory),
      rentalType: formState.rentalType,
      featured: formState.featured,
      newarrivals: formState.newarrivals,
      taxInclued: formState.taxInclued,
      taxRate: parseFloat(formState.taxRate),
      categoryId: formState.categoryId,
      unit: formState.unit,
      exchangeRateId: formState.exchangeRateId,
      requiresPrescription: formState.requiresPrescription,
      expirationDate: formState.expirationDate,
      dosage: formState.dosage,
      usageInstructions: formState.usageInstructions,
      contraindications: formState.contraindications,
      activeIngredient: formState.activeIngredient,
      isComposite: formState.isComposite,
    }

    let newProductId = productId

    try {
      if (newProductId) {
        await updateProduct({
          variables: { id: productId, input: adjustedFormState },
        })
       
      } else {
        const newProduct = await createProduct({
          variables: { input: adjustedFormState },
        })
        newProductId = newProduct.data.createProduct.id
        
      }
      
      const { dataC } = await removeProductColor({
        variables: {
          input: {
            ProductId: newProductId,
          },
        },
      })
      const { dataZ } = await removeProductSize({
        variables: {
          input: {
            ProductId: newProductId,
          },
        },
      })

      const productSizes = selectedSizes.map((sizeId) => ({
        ProductId: newProductId,
        SizeId: sizeId,
        stock: 10,
      }))

      const productColors = selectedColors.map((colorId) => ({
        ProductId: newProductId,
        ColorId: colorId,
      }))

      await addMultipleProductSizes({ variables: { input: productSizes } })
      await addMultipleProductColors({ variables: { input: productColors } })

      handleAddImages(selectedImages, newProductId)
      await handleCompositeProductItems(newProductId)
      await handleAddUpdateCosts(newProductId)

      if (productId) {
        toast({
          title: 'Producto actualizado',
          description: 'El producto ha sido actualizado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Producto creado',
          description: 'El producto ha sido creado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }

      setTimeout(() => {
        onSuccess()
      }, 3000)
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  const handleProductSelect = (products) => {
    setSelectedCompositeProducts(products)
  }

  async function handleCompositeProductItems(newProductId) {
    const compositeProductItems = selectedCompositeProducts.map((item) => ({
      mainProductId: newProductId,
      includedProductId: item.includedProduct.includedProductId ? item.includedProduct.includedProductId : item.includedProduct.id,
      quantity: item.quantity,
      isNew: item.isNew ? item.isNew : false,
    }))
    console.log('compositeProductItems', compositeProductItems)
    // Create or update composite product items.
    for (const item of compositeProductItems) {
      const mutationItem = {
        mainProductId: item.mainProductId,
        includedProductId: item.includedProductId,
        quantity: Number(item.quantity),
      }

      if (item.isNew) {
        await createProductComposite({
          variables: { input: mutationItem },
        })
      } else {
        await updateProductComposite({
          variables: {
            mainProductId: item.mainProductId,
            includedProductId: item.includedProductId,
            input: mutationItem,
          },
        })
      }
    }
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const handleRentalTypeChange = (event) => {
    const rentalType = event.target.value
    setFormState({
      ...formState,
      rentalType: rentalType.toLowerCase(),
    })
  }

  const handlecalcMethodChange = (event) => {
    const calcMethod = event.target.value
    setFormState({
      ...formState,
      calcMethod: calcMethod.toLowerCase(),
    })
  }




    return {
        formState,
        setFormState,
        handleCostChange,
        handleNumberInputChange,
        handleAddImages,
        handleChange,
        handleSelectedColors,
        handleSelectedSizes,
        handleAddUpdateCosts,
        onImageSelect,
        handlecalcMethodChange,
        handleRentalTypeChange,
        handleCheckboxChange,
        handleProductSelect,
        handleSubmit,
        selectedSizes,
        selectedColors,
        isLoading,
        selectedImages,
        selectedCompositeProducts,
        handleCompositeProductItems,
        data,
        loading,
        error,
        createProduct,
        updateProduct,
        addMultipleProductSizes,
        addMultipleProductColors,
        createProductComposite,
        updateProductComposite,
        createProductCosts,
        updateProductCosts,
        addImages,
        removeProductSize,
        removeProductColor,
        dbColors,
        dbSizes,
        createLoading,
    updateLoading,
      }
    
    
  
}