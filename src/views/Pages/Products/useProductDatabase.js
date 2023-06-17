import { useGetProduct, useCreateProduct, useUpdateProduct } from 'graphql/products/crudProducts'
import { useRemoveProductColor, useAddMultipleProductColors } from 'graphql/productcolor/crudProductColor'
import { useRemoveProductSize, useAddMultipleProductSizes } from 'graphql/productsize/crudProductSize'
import { useCreateCompositeProductItem, useUpdateCompositeProductItem } from 'graphql/compositeproductitems/crudCompositeProductItems'
import { useCreateProductCost, useUpdateProductCost } from 'graphql/productcosts/crudProductcosts'
import { useAddImages } from 'graphql/image/crudImage'

export default function useProductDatabase(productId, onCancel, onSucess) {
    const { data, loading, error } = useGetProduct(productId, {
        skip: !productId,
      })
    
      const [createProduct, { loading: createLoading }] = useCreateProduct()
      const [updateProduct, { loading: updateLoading }] = useUpdateProduct()
      const [addMultipleProductSizes] = useAddMultipleProductSizes()
      const [addMultipleProductColors] = useAddMultipleProductColors()
      const [createProductComposite, { loading: createLoadingComposite }] = useCreateCompositeProductItem()
      const [updateProductComposite, { loading: updateLoadingComposite }] = useUpdateCompositeProductItem()
      const [createProductCosts, { loading: createLoadingCosts }] = useCreateProductCost()
      const [updateProductCosts, { loading: updateLoadingCosts }] = useUpdateProductCost()
    
      const [addImages] = useAddImages()
    
      const [removeProductSize] = useRemoveProductSize()
      const [removeProductColor] = useRemoveProductColor()
  
  return {
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
  }

}