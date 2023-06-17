export function calculateSalePriceAndProfitMargin(
  price,
  purchaseCost,
  otherCosts,
  shippingCost,
  taxRateCosts,
  taxRate,
  profit,
  isTaxedCost,
  calcMethod
) {
  console.log('Initial parameters: ', price, purchaseCost, otherCosts, shippingCost, taxRateCosts, taxRate, profit, isTaxedCost, calcMethod)

  let totalCost = Number(purchaseCost) + Number(otherCosts) + Number(shippingCost)
  console.log('Initial totalCost: ', totalCost)

  if (isTaxedCost) {
    totalCost += totalCost * (Number(taxRateCosts) / 100)
    console.log('Updated totalCost after tax: ', totalCost)
  }

  let salePrice = 0
  let profitMarginPercent = 0

  if (calcMethod === 'cost') {
    const profits = totalCost * (Number(profit) / 100)
    console.log('Profits: ', profits)
    
    const preTaxPrice = totalCost + profits
    console.log('preTaxPrice: ', preTaxPrice)

    const tax = preTaxPrice * (Number(taxRate) / 100)
    console.log('Tax: ', tax)
    
    salePrice = preTaxPrice + tax
    console.log('salePrice: ', salePrice)
    
    profitMarginPercent = (profits / totalCost) * 100
    console.log('profitMarginPercent: ', profitMarginPercent)

  } else if (calcMethod === 'sale' && profit !== 0) {
    const preTaxPrice = totalCost / (1 - Number(profit) / 100)
    console.log('preTaxPrice: ', preTaxPrice)

    const tax = preTaxPrice * (Number(taxRate) / 100)
    console.log('Tax: ', tax)

    salePrice = preTaxPrice + tax
    console.log('salePrice: ', salePrice)

    // Calculamos la ganancia real que obtenemos con el nuevo precio de venta.
    const profits = salePrice - totalCost
    console.log('Profits: ', profits)

    // No necesitamos calcular el porcentaje de margen de beneficio, ya que es el valor de profit proporcionado como entrada.
    profitMarginPercent = profit
    console.log('profitMarginPercent: ', profitMarginPercent)
}


  return {
    salePrice: Number(salePrice.toFixed(2)),
    profitMargin: Number(profitMarginPercent.toFixed(2))
  }
}



export const initialState = {
  id: null,
  name: '',
  vendor: '',
  description: '',
  image: '',
  price: 0,
  profit:30,
  inventory: 0,
  rentalType: '',
  featured: false,
  newarrivals: false,
  taxRate: 0,
  taxInclued: false,
  categoryId: '',
  exchangeRateId: '',
  requiresPrescription: false,
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
  isTaxedCost: false,
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
    
      
      const { salePrice, profitMargin } = calculateSalePriceAndProfitMargin(
        state.price,
        state.purchaseCost,
        state.otherCosts,
        state.shippingCost,
        state.taxRateCosts,
        state.taxRate,
        state.profit,
        state.isTaxedCost,
        state.calcMethod
      )
    
      console.log('New Sale Price: ', salePrice)
      console.log('New Profit Margin: ', profitMargin)
    
      return {
        ...state,
        price: salePrice,
        profit: profitMargin,
      }
    }
    
    case 'FIELD_CHANGE':
      return { ...state, [action.fieldName]: action.value }
    case 'UPDATE_FROM_DATA':
      return { ...state, ...action.payload }
    case 'SET_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      }
    default: {
      throw new Error(`Unknown action type: ${action.type}`)
      return state
    }
  }
}
