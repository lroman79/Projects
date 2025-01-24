<script setup>
import { onMounted, ref, computed } from 'vue'
import { products } from '@/entities/index.js'

import VueSelect from 'vue3-select-component'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
})

const product = ref(null)

const imageUrl = ref(null)

const selectedFields = ref([])

const attributesFields = ref([])

const variantsLabels = ref([])

const subCategory = ref('')

const selectedImageSrc = computed(() => {
  return `https://fedtest.bylith.com/api/imager.php?url=${imageUrl.value}&type=fit&width=1000&height=1000&quality=70`
})

const formatAttributes = () => {
  return product.value.attributes.map(({ id, title, labels, type }) => {
    return {
      id,
      type,
      title,
      options: labels.map(({ title, id }) => ({ label: title, id })),
    }
  })
}

const getVariantsLabels = () => {
  return product.value.variants.map((variant) => variant.labels).sort()
}

const getImageName = (string) => {
  const stringArr = string.toLowerCase().split(' ')
  return stringArr.join(stringArr.length > 0 ? '-' : '')
}

const getDefaultImageUrl = () => {
  const attributesColor = attributesFields.value.find((item) => item.type === 'COLOR')
  if (attributesColor) {
    const imageName = getImageName(attributesColor.options[0].label)
    const { url } = product.value.images.find((item) => item.title.includes(imageName))
    return url
  }

  return product.value.images[0].url
}

const fetchProductData = async () => {
  product.value = await products.actions.getProduct(props.productId)

  attributesFields.value = formatAttributes()
  variantsLabels.value = getVariantsLabels()
  console.log('variantsLabels', variantsLabels.value)

  imageUrl.value = getDefaultImageUrl()

  console.log('product', product.value)
  console.log('attributesFields', attributesFields.value)
  console.log('attributes', product.value.attributes)
  console.log('variants', product.value.variants)
}

const onSelectChange = (attribute, $event) => {
  filterVariants(attribute.id, $event?.label_id)

  if (attribute.title === 'Overall Style' && $event !== null) {
    subCategory.value = $event.label.toLowerCase()
  }
  // Check if the current attribute is of type 'COLOR'
  if (attribute.type === 'COLOR' && $event !== null) {
    let imageName = getImageName($event.label)
    if (subCategory.value) imageName = imageName + '-' + subCategory.value

    const imageData = product.value.images.find(
      (item) => item.title.toLowerCase().split('.')[0] === imageName,
    )
    if (imageData !== undefined) imageUrl.value = imageData.url
  } else {
    console.log(`Other attribute selected: ${attribute.title}`)
  }
}

const filterVariants = (attributeId, labelId) => {
  const filtered = variantsLabels.value.filter((variant) =>
    variant.some((item) => item.attribute_id === attributeId && item.label_id === labelId),
  )
  console.log('variantsLabels', variantsLabels.value)
  const grouped = filtered.flat().reduce((acc, { attribute_id, label_id }) => {
    if (!acc[attribute_id]) {
      acc[attribute_id] = []
    }

    if (!acc[attribute_id].includes(label_id)) {
      acc[attribute_id].push(label_id)
    }

    return acc
  }, {})

  console.log('grouped', JSON.stringify(grouped, true, 2))

  const result = Object.keys(grouped).map((attribute_id) => ({
    attribute_id,
    label_id: grouped[attribute_id],
  }))

  if (attributeId == 1) {
    const colors = product.value.attributes.find(({ id }) => id == 1)
    result[0].label_id = colors.labels.map(({ id }) => id)
  }

  console.log('result', JSON.stringify(variantsLabels.value, true, 2))

  attributesFields.value = formatAttributes()
  for (let i = 0; i < attributesFields.value.length; i++) {
    const optionGroup = attributesFields.value[i]
    // Find the matching label_id array for the current attribute_id
    const matchingLabelIds = result.find((item) => item.attribute_id == optionGroup.id)
    console.log('matchingLabelIds', matchingLabelIds)

    if (matchingLabelIds) {
      // Filter options based on matching label_id values
      optionGroup.options = optionGroup.options.filter((option) =>
        matchingLabelIds.label_id.includes(option.id),
      )
      //   if(attributeId === optionGroup.id) {

      //       optionGroup.options = result[attributeId]
      //   }
    }
  }
}

onMounted(() => {
  fetchProductData()
})
</script>

<template>
  <div class="wrp">
    <div class="image-sec">
      <div class="img-wrp">
        <img :src="selectedImageSrc" />
      </div>
    </div>
    <div class="content-sec">
      <h3>{{ product?.title }}</h3>
      <div>{{ product?.description }}</div>
      <div v-if="attributesFields.length">
        <div v-for="(attribute, index) in attributesFields" :key="index">
          {{ attribute.title }}
          <v-select
            v-model="selectedFields[index]"
            :options="attribute.options"
            :placeholder="`Choose ${attribute.title}`"
            :reduce="
              (option) => ({ attribute_id: attribute.id, label_id: option.id, label: option.label })
            "
            @update:modelValue="onSelectChange(attribute, $event)"
          ></v-select>
        </div>
      </div>
      {{ selectedFields }}
    </div>
  </div>
</template>

<style scoped>
.wrp {
  display: flex;
  padding: 0 50px;
}

.image-sec {
  width: 50%;
}

img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.img-wrp {
  max-width: 598px;
  height: 824px;
  display: flex;
  border: solid 1px #333;
}

.content-sec {
  width: 50%;
  padding-left: 50px;
}
</style>
