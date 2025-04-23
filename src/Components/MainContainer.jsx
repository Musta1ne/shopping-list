import React, { useState } from 'react'
import Button from './Button'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

export default function MainContainer() {
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [items, setItems] = useState([])

  const handleAddItem = () => {
    const trimmedItem = item.trim()
    const parsedQuantity = parseInt(quantity)

    if (trimmedItem !== '' && parsedQuantity > 0) {
      setItems([
        ...items,
        { name: trimmedItem, quantity: parsedQuantity, isBought: false, isEditing: false }
      ])
      setItem('')
      setQuantity(1)
    }
  }

  const handleDeleteItem = (index) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const handleToggleBought = (index) => {
    const updatedItems = [...items]
    updatedItems[index].isBought = !updatedItems[index].isBought
    setItems(updatedItems)
  }

  const handleEditItem = (index) => {
    const updatedItems = [...items]
    updatedItems[index].isEditing = true
    setItems(updatedItems)
  }

  const handleSaveEdit = (index, newName, newQty) => {
    const updatedItems = [...items]
    if (newName.trim() !== '' && parseInt(newQty) > 0) {
      updatedItems[index].name = newName.trim()
      updatedItems[index].quantity = parseInt(newQty)
      updatedItems[index].isEditing = false
      setItems(updatedItems)
    }
  }

  const handleCancelEdit = (index) => {
    const updatedItems = [...items]
    updatedItems[index].isEditing = false
    setItems(updatedItems)
  }

  const sortedItems = [
    ...items.filter(item => !item.isBought),
    ...items.filter(item => item.isBought)
  ]

  return (
    <div className="p-6">
      <section className="min-h-190 max-w-300 mx-auto bg-cyan-700 shadow-black shadow-2xl rounded-xl p-6 space-y-4">
        
        <div className="flex flex-col md:flex-row justify-center md:space-x-2 space-y-2 md:space-y-0">
          <input
            type="text"
            className="px-4 py-2 rounded-lg w-full text-xl bg-slate-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Agregar ítem..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            className="px-4 py-2 rounded-lg w-32 text-xl bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div onClick={handleAddItem}>
            <Button title="AGREGAR" />
          </div>
        </div>

        <ul className="mt-4 text-white space-y-2 text-xl">
          {sortedItems.map((item, _) => {
            const realIndex = items.findIndex((i) => i === item)

            return (
              <li
                key={realIndex}
                className={`bg-cyan-900 px-4 py-2 rounded-lg flex items-center justify-between gap-4 ${
                  item.isBought ? 'opacity-60 line-through' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.isBought}
                    onChange={() => handleToggleBought(realIndex)}
                  />
                  {item.isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={item.name}
                        className="px-2 rounded bg-white text-black"
                        id={`name-${realIndex}`}
                      />
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        min="1"
                        className="px-2 w-20 rounded bg-white text-black"
                        id={`qty-${realIndex}`}
                      />
                    </div>
                  ) : (
                    <span>{item.name} x{item.quantity}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {item.isEditing ? (
                    <>
                      <button
                        onClick={() =>
                          handleSaveEdit(
                            realIndex,
                            document.getElementById(`name-${realIndex}`).value,
                            document.getElementById(`qty-${realIndex}`).value
                          )
                        }
                        className="text-green-400 hover:text-green-600"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleCancelEdit(realIndex)}
                        className="text-yellow-400 hover:text-yellow-600"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditItem(realIndex)}
                      className="text-blue-300 hover:text-blue-500"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteItem(realIndex)}
                    className="text-red-300 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
