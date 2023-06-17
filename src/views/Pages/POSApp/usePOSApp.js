import React, { useState, useEffect, useCallback } from 'react'


import { createColumns } from './gridColumns'

export default function usePOSApp() {
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const [selectedOperation, setSelectedOperation] = useState(null)
    const [selectedRowId, setSelectedRowId] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [taxDetails, setTaxDetails] = useState({})
    const [subtotal, setSubtotal] = useState(0)


    const handleCellClick = (params) => {
        if (selectedRows.includes(params.id)) {
          setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.filter((id) => id !== params.id)
          )
        } else {
  
          setSelectedRows((prevSelectedRows) => [...prevSelectedRows, params.id])
        }
      }
    
      const handleNumericButtonClick = (number) => {
        if (number === 'backspace') {
          // Si el botón es de "Borrar", elimina el último dígito del input
          setInputValue((prevValue) => prevValue.slice(0, -1))
        } else if (number === '.') {
          // Si el botón es un punto decimal, verifica que no haya uno ya en el input y lo agrega
          if (!inputValue.includes('.')) {
            setInputValue((prevValue) => `${prevValue}${number}`)
          }
        } else {
          // Si no es un botón especial, procesa la entrada de número
          if (!selectedRowId) {
            // Si no hay fila seleccionada, simplemente agrega el número al input
            setInputValue((prevValue) => `${prevValue}${number}`)
          } else {
            // Si hay una fila seleccionada, actualiza la cantidad o el precio de la fila según la operación seleccionada
            const selectedRow = rows.find((row) => row.id === selectedRowId)
    
            if (!selectedRow) {
              return
            }
    
            const newRows = rows.map((row) => {
              if (row.id === selectedRow.id) {
                if (selectedOperation === 'Cant') {

                  row.cant = parseFloat(`${row.cant}${number}`)
                } else if (selectedOperation === 'Precio') {
                  row.price = parseFloat(`${row.price}${number}`)
                }
              }
              return row
            })
    
            setRows(newRows)
            updateTotal(newRows)
            setInputValue((prevValue) => `${prevValue}${number}`)
          }
        }
      }
    
      const handleEnterClick = useCallback(() => {
        if (!inputValue) {
          if (!selectedOperation) {
            fetchProductByCode(inputValue).then((product) => {
              if (product) {
                handleProductDoubleClick(product)
              }
              setInputValue('')
            })
          }
          return
        }
    
        const parsedNumber = parseFloat(inputValue)
    
        const newRows = rows.map((row) => {
          if (selectedRows.includes(row.id)) {
            // Aplica los cambios solo a las filas seleccionadas
            switch (selectedOperation) {
              case 'Cant':
                row.cant = parsedNumber
                break
              case 'Precio':
                row.price = parsedNumber
                break
              case '% Desc':
                const discount = parseFloat(inputValue)
                if (!isNaN(discount)) {
                  row.price = row.price * (1 - discount / 100)
                }
                break
              default:
                break
            }
          }
          return row
        })
    
        setRows(newRows)
        updateTotal(newRows)
        setInputValue('')
        setSelectedOperation(null)
        setSelectedRowId(null)
        //setSelectedRows([]);
      }, [rows, inputValue, selectedOperation, selectedRows])
    
 
    
      const fetchProductByCode = (code) => {
        return new Promise((resolve) => {
          // Simula un tiempo de espera de 1 segundo para buscar el producto
          setTimeout(() => {
            alert(`Buscando producto con código: ${code}`)
            resolve(null) // Devuelve 'null' ya que esta es solo una función temporal
          }, 1000)
        })
      }
    
      const handleProductDoubleClick = (product) => {
        const productIndex = rows.findIndex((row) => row.id === product.id)
       
    
        if (productIndex !== -1) {
          const newRows = [...rows]
          newRows[productIndex].cant++
          setRows(newRows)
          updateTotal(newRows) // Agrega esta línea para actualizar el total general
        } else {
         // console.log('product', product)
          const newRow = { ...product, cant: 1 }
          setRows([...rows, newRow])
          updateTotal([...rows, newRow]) // Agrega esta línea para actualizar el total general
        }
      }
    
      const incrementQuantity = (params) => {
        const newRows = rows.map((row) => {
          if (row.id === params.id) {
            row.cant += 1
          }
          return row
        })
        setRows(newRows)
        updateTotal(newRows)
      }
    
      const decrementQuantity = (params) => {
        const newRows = rows.map((row) => {
          if (row.id === params.id && row.cant > 0) {
            row.cant -= 1
          }
          return row
        })
        setRows(newRows)
        updateTotal(newRows)
      }
    
      const deleteRow = (params) => {
        const newRows = rows.filter((row) => row.id !== params.id)
        setRows(newRows)
        updateTotal(newRows)
      }
    
  

      const updateTotal = (rows) => {
        let newSubtotal = 0
        let newTotal = 0
        let newTaxDetails = {}

        rows.forEach((row) => {
            const cant = parseFloat(row.cant)
            let price = parseFloat(row.price)
    
            if (isNaN(cant) || isNaN(price)) {
                return
            }
            
            const taxRate = parseFloat(row.taxRate) || 0
            let basePrice, tax
    
            if (row.taxInclued) {
                basePrice = price / (1 + taxRate / 100)
                tax = price - basePrice
            } else {
                basePrice = price
                tax = price * (taxRate / 100)
            }
    
            newSubtotal += basePrice * cant
            newTotal += (basePrice + tax) * cant
    
            // If this taxRate does not exist in newTaxDetails, add it.
            if (!newTaxDetails[taxRate]) {
                newTaxDetails[taxRate] = { subtotal: 0, tax: 0 }
            }

            newTaxDetails[taxRate].subtotal += basePrice * cant
            newTaxDetails[taxRate].tax += tax * cant
        })
        
        setSubtotal(newSubtotal)
        setTotal(newTotal)
        setTaxDetails(newTaxDetails)
    }
    



    
      const handleDetailsClick = () => {
        alert(`Detalles del total: $${total}`)
      }
    
      const columns = createColumns(
        incrementQuantity,
        decrementQuantity,
        deleteRow
      )
    
      const handleInputChange = (event) => {
        const newValue = event.target.value
        setInputValue(newValue)
      }
    
      const resetState = () => {
        setRows([])
        setTaxDetails({})
        setTotal(0)

        
      }

    return {
        rows,
        setRows,
        total,
        resetState,
        setTotal,
        selectedOperation,
        setSelectedOperation,
        selectedRowId,
        setSelectedRowId,
        inputValue,
        setInputValue,
        selectedRows,
        setSelectedRows,
        handleCellClick,
        handleNumericButtonClick,
        handleEnterClick,
        handleProductDoubleClick,
        incrementQuantity,
        decrementQuantity,
        deleteRow,
        handleDetailsClick,
        handleInputChange,
        fetchProductByCode,
        subtotal,
        taxDetails,
        updateTotal,
        columns,
    }
}
