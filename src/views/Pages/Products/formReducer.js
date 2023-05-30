export function calculateSalePrice(
  purchaseCost = 0,
  otherCosts = 0,
  shippingCost = 0,
  taxRateCosts = 0,
  taxRateSale = 0,
  profitMargin = 0,
  isTaxedCost,
  calcMethod
) {
  let totalCost = Number(purchaseCost) + Number(otherCosts) + Number(shippingCost)

  if (isTaxedCost) {
    totalCost += totalCost * Number(taxRateCosts)
  }

  if (calcMethod === 'cost') {
    const profit = totalCost * Number(profitMargin)
    const preTaxPrice = totalCost + profit
    const tax = preTaxPrice * Number(taxRateSale)
    const salePrice = preTaxPrice + tax

    return Number(salePrice.toFixed(2))
  } else if (calcMethod === 'sale' && profitMargin !== 0) {
    // Check if profitMargin is not 0
    const preTaxPrice = totalCost / (1 - Number(profitMargin))
    const tax = preTaxPrice * Number(taxRateSale)
    const salePrice = preTaxPrice + tax

    return Number(salePrice.toFixed(2))
  }
  return 0 // Return 0 if profitMargin is 0
}

export function calculateProfitMargin(salePrice = 0, purchaseCost = 0, otherCosts = 0, shippingCost = 0, taxRateCosts = 0, isTaxedCost, calcMethod) {
  let totalCost = Number(purchaseCost) + Number(otherCosts) + Number(shippingCost)

  if (isTaxedCost) {
    totalCost += totalCost * Number(taxRateCosts)
  }

  if (Number(salePrice) >= totalCost) {
    // Check if salePrice is greater or equal to totalCost
    const profit = Number(salePrice) - totalCost

    if (calcMethod === 'cost') {
      const profitMargin = (profit / totalCost) * 100
      return Number(profitMargin.toFixed(2))
    } else if (calcMethod === 'sale') {
      const profitMargin = (profit / salePrice) * 100
      return Number(profitMargin.toFixed(2))
    }
  }
  return 0 // Return 0 if salePrice is less than totalCost
}

export const initialState = {
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
  sizes: [],
  colors: [],
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    }
    case 'calculate': {
      const { purchaseCost, otherCosts, shippingCost, taxRateCosts, taxRateSale, profitMargin, isTaxedCost, calcMethod } = state

      let totalCost = Number(purchaseCost) + Number(otherCosts) + Number(shippingCost)

      if (isTaxedCost) {
        totalCost += totalCost * Number(taxRateCosts)
      }

      let newSalePrice = 0
      let newProfitMargin = 0

      if (calcMethod === 'cost') {
        const profit = totalCost * Number(profitMargin)
        const preTaxPrice = totalCost + profit
        const tax = preTaxPrice * Number(taxRateSale)
        newSalePrice = preTaxPrice + tax

        newProfitMargin = (profit / totalCost) * 100
      } else if (calcMethod === 'sale') {
        const preTaxPrice = totalCost / (1 - Number(profitMargin))
        const tax = preTaxPrice * Number(taxRateSale)
        newSalePrice = preTaxPrice + tax

        newProfitMargin = ((newSalePrice - totalCost) / newSalePrice) * 100
      }

      return {
        ...state,
        price: Number(newSalePrice.toFixed(2)),
        profit: Number(newProfitMargin.toFixed(2)),
      }
    }
    case 'FIELD_CHANGE':
      return { ...state, [action.fieldName]: action.value }
    case 'UPDATE_FROM_DATA':
      return { ...state, ...action.payload }
    default: {
      throw new Error(`Unknown action type: ${action.type}`)
      return state
    }
  }
}
