<script setup>
import { reactive, computed, ref } from 'vue'

// Sample product data (with variants and attributes)
const product = reactive({
  variants: [
    {
      id: '246',
      title: 'Variant 1 - Grey, XL',
      image: { title: 'the image alt', url: 'products/images/f9CNN5xmOp.png' },
      price: '195.00',
      labels: [
        { attribute_id: '27', label_id: '112' }, // Color = Grey
        { attribute_id: '28', label_id: '200' }, // Size = XL
      ],
    },
    {
      id: '247',
      title: 'Variant 1 - Grey, XL',
      image: { title: 'the image alt', url: 'products/images/f9CNN5xmOp.png' },
      price: '195.00',
      labels: [
        { attribute_id: '27', label_id: '112' }, // Color = Grey
        { attribute_id: '28', label_id: '199' }, // Size = L
      ],
    },
    {
      id: '248',
      title: 'Variant 2 – Blue, L',
      image: { title: 'image description', url: 'products/images/jwMjc7Veo1.png' },
      price: '195.00',
      labels: [
        { attribute_id: '27', label_id: '111' }, // Color = Blue
        { attribute_id: '28', label_id: '199' }, // Size = L
      ],
    },
    {
      id: '249',
      title: 'Variant 3 - Gold, M',
      image: { title: 'this is variant 3’ alt', url: 'products/images/CyTLH1DZKN.png' },
      price: '195.00',
      labels: [
        { attribute_id: '27', label_id: '114' }, // Color = Gold
        { attribute_id: '28', label_id: '198' }, // Size = M
      ],
    },
  ],
  attributes: [
    {
      id: '27',
      title: 'Color',
      type: 'COLOR',
      labels: [
        { id: '111', title: 'Blue', data: '#264365' },
        { id: '112', title: 'Grey', data: '#404040' },
        { id: '113', title: 'White', data: '#ffffff' },
        { id: '114', title: 'Gold', data: '#d4af37' },
        { id: '115', title: 'Red', data: '#ff0000' }, // Added Red for testing
      ],
    },
    {
      id: '28',
      title: 'Size',
      type: 'TEXT',
      labels: [
        { id: '199', title: 'L' },
        { id: '200', title: 'XL' },
        { id: '198', title: 'M' },
      ],
    },
  ],
})

const test = ref()
console.log(test.value)

// Reactive state for selected attributes
const selectedAttributes = reactive({
  27: '', // Initially no color selected
  28: '', // Initially no size selected
})

// Function to filter variants dynamically based on selected attributes
const filterVariants = () => {
  if (!selectedAttributes['27'] && !selectedAttributes['28']) {
    return product.variants // If no selection, show all variants
  }

  return product.variants.filter((variant) => {
    return variant.labels.every((label) => {
      if (selectedAttributes[label.attribute_id]) {
        return selectedAttributes[label.attribute_id] === label.label_id
      }
      return true
    })
  })
}

// Function to update available options for the dropdowns based on selected attributes
const updateDropdownOptions = () => {
  // Filter the variants first to get valid options based on current selections
  const filteredVariants = filterVariants()
  console.log('filteredVariants', filteredVariants)
  // Update the available options for each attribute
  product.attributes.forEach((attribute) => {
    // Find the labels available for this attribute based on the filtered variants
    const validLabels = filteredVariants.flatMap((variant) => {
      return variant.labels
        .filter((label) => label.attribute_id === attribute.id)
        .map((label) => label.label_id)
    })
    console.log(validLabels)

    // Update the options for each attribute by keeping only valid label_ids
    attribute.labels.forEach((label) => {
      label.isValid = validLabels.includes(label.id) // Mark valid labels
    })
  })
}

// Watch for changes to selected attributes and update dropdown options accordingly
const filteredVariants = computed(() => {
  // Update dropdown options when selectedAttributes changes
  updateDropdownOptions()
  return filterVariants()
})
</script>

<template>
  <div>
    <div v-for="attribute in product.attributes" :key="attribute.id">
      <label>{{ attribute.title }}</label>
      <select v-model="selectedAttributes[attribute.id]" @change="updateDropdownOptions">
        <option
          v-for="label in attribute.labels"
          :key="label.id"
          :value="label.id"
          :disabled="!label.isValid"
        >
          {{ label.title }}
        </option>
        <option value="">Choose {{ attribute.title }}</option>
      </select>
    </div>

    <div>
      <h2>Available Variants</h2>
      <div v-for="variant in filteredVariants" :key="variant.id">
        <h3>{{ variant.labels }}</h3>
        <img :src="variant.image.url" :alt="variant.image.title" />
        <p>{{ variant.price }}</p>
      </div>
    </div>
  </div>
</template>
