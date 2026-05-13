import { useState, useCallback } from 'react'

const validationRules = {
  name: { label: 'Name', required: true },
  email: { label: 'Email', required: true, email: true },
  company: { label: 'Company' },
  message: { label: 'Message', required: true, minLength: 10 },
}

const initialValues = { name: '', email: '', company: '', message: '' }

export function useFormValidation() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName]
    if (!rules) return ''

    if (rules.required && !value.trim()) return `${rules.label} is required`
    if (rules.email && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Please enter a valid email address'
    if (rules.minLength && value.trim() && value.trim().length < rules.minLength)
      return `${rules.label} must be at least ${rules.minLength} characters`
    return ''
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
  }

  const validateAll = () => {
    const newErrors = {}
    Object.keys(validationRules).forEach((field) => {
      newErrors[field] = validate(field, values[field] || '')
    })
    setErrors(newErrors)
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    )
    return Object.values(newErrors).every((e) => e === '')
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset }
}
