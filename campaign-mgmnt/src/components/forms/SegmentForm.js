'use client'

import { useState } from 'react'
import FormField from '@/components/forms/Formfield.js'

const SegmentFields = {
  name: { type: 'text', label: 'Segment Name', required: true, placeholder: 'e.g, High Return Customer' },
  logicOperator: { type: 'text', label: 'Logical Operator', required: true, placeholder: 'e.g, AND' }
}

const ConditionFields = [
  { field: 'totalSpending', operator: '>', value: '' },
  { field: 'visits', operator: '>', value: '' }
]

const operatorOptions = [
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '>=' },
  { value: '<=', label: '<=' }
]

export default function SegmentForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [conditions, setConditions] = useState(ConditionFields)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleConditionChange = (index, e) => {
    const { name, value } = e.target
    const newConditions = [...conditions]
    newConditions[index][name] = value
    setConditions(newConditions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    Object.entries(SegmentFields).forEach(([name, field]) => {
      if (field.required && !formData[name]) {
        newErrors[name] = `${field.label} is required`
      }
    })
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
      onSubmit({ ...formData, conditions })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.entries(SegmentFields).map(([name, field]) => (
        <FormField
          key={name}
          field={field}
          value={formData[name] || ''}
          onChange={handleChange}
          errors={errors[name]}
        />
      ))}
      {conditions.map((condition, index) => (
        <div key={index} className="space-y-4">
          <FormField
            field={{ type: 'text', label: 'Field', required: true }}
            value={condition.field}
            onChange={(e) => handleConditionChange(index, e)}
            errors={errors[`conditions[${index}].field`]}
          />
          <FormField
            field={{ type: 'select', label: 'Operator', required: true }}
            value={condition.operator}
            onChange={(e) => handleConditionChange(index, e)}
            errors={errors[`conditions[${index}].operator`]}
            options={operatorOptions}
          />
          <FormField
            field={{ type: 'number', label: 'Value', required: true }}
            value={condition.value}
            onChange={(e) => handleConditionChange(index, e)}
            errors={errors[`conditions[${index}].value`]}
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}