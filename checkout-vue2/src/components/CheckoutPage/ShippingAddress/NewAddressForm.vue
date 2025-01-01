<template>
  <div>
    <form @submit.prevent="submitForm">
      <div
        v-for="field in formFields"
        :key="field.model"
        :class="$style['input-wrp']"
      >
        <div>
          <label :for="field.model">{{ field.label }}:</label>
        </div>
        <input
          type="text"
          v-bind="field.inputProps"
          v-model="form[field.model]"
          :class="{ invalid: formErrors[field.model] }"
          :placeholder="field.label"
        />
        <span v-if="formErrors[field.model]" :class="$style['error-message']">
          {{ formErrors[field.model] }}
        </span>
      </div>

      <!-- Submit button -->
      <div :class="$style['buttons-wrp']">
        <button type="submit" :disabled="isFormInvalid">Submit</button>
        <button type="button" @click="closeForm">cancel</button>
      </div>
    </form>
    <div v-if="isFormSuccess" :class="$style['success-message']">
      The address has been successfully added!
    </div>
    <!-- Displaying error message -->
    <div v-if="errorMessage" :class="$style['error-message']">
      {{ errorMessage }}
    </div>
    <div v-if="isLoading">Submitting...</div>
  </div>
</template>

<script>
import { saveNewAddress } from "@/entities/checkoutCart/actions";

export default {
  data() {
    return {
      form: {
        id: " ",
        addressLine1: "main street",
        addressLine2: "road 3",
        city: "New York",
        state: "NY",
        zipCode: "12345",
        country: "US",
        saved: true,
      },
      formFields: [
        {
          label: "Address Line 1",
          model: "addressLine1",
        },
        {
          label: "Address Line 2",
          model: "addressLine2",
        },
        {
          label: "City",
          model: "city",
        },
        {
          label: "State",
          model: "state",
        },
        {
          label: "Zip Code",
          model: "zipCode",
        },
        {
          label: "Country",
          model: "country",
        },
      ],
      formErrors: {
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        zipCode: null,
        country: null,
      },
      isFormSuccess: false,
      errorMessage: "",
      isLoading: false,
    };
  },
  computed: {
    addressLine1Error() {
      if (!this.form.addressLine1) return "Address Line 1 is required.";
      return null;
    },

    addressLine2Error() {
      if (this.form.addressLine2 && this.form.addressLine2.length > 100)
        return "Address Line 2 must be less than 100 characters.";
      return null;
    },

    cityError() {
      if (!this.form.city) return "City is required.";
      if (this.form.city.length > 100)
        return "City must be less than 100 characters.";
      return null;
    },

    stateError() {
      if (!this.form.state) return "State is required.";
      if (this.form.state.length !== 2)
        return "State must be a 2-letter abbreviation (e.g., CA).";
      return null;
    },

    zipCodeError() {
      if (!this.form.zipCode) return "Zip Code is required.";
      if (!/^\d{5}$/.test(this.form.zipCode))
        return "Zip Code must be exactly 5 digits.";
      return null;
    },

    countryError() {
      if (!this.form.country) return "Country is required.";
      return null;
    },

    isFormInvalid() {
      return (
        this.addressLine1Error ||
        this.cityError ||
        this.stateError ||
        this.zipCodeError ||
        this.countryError
      );
    },
  },
  watch: {
    // Watch for any validation errors to update formErrors object
    form: {
      handler() {
        this.isFormSuccess = false;
        this.formErrors.addressLine1 = this.addressLine1Error;
        this.formErrors.addressLine2 = this.addressLine2Error;
        this.formErrors.city = this.cityError;
        this.formErrors.state = this.stateError;
        this.formErrors.zipCode = this.zipCodeError;
        this.formErrors.country = this.countryError;
      },
      deep: true,
    },
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      console.log("form", this.form);
      try {
        await saveNewAddress(this.form);
        this.isLoading = false;
        this.isFormSuccess = true;
      } catch (error) {
        console.log(error);
        this.isLoading = false;

        if (error.response) {
          // The request was made, but the server responded with an error status
          // Example: 400, 404, 500
          console.error("Error response:", error.response);
          this.errorMessage = `Something went wrong: ${
            error.response.data.message || "Please try again later."
          }`;
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response received:", error.request);
          this.errorMessage =
            "No response from server. Please check your connection and try again.";
        } else {
          // Other errors (e.g., invalid configuration, network issues)
          console.error("Request error:", error.message);
          this.errorMessage = `Error: ${error.message}`;
        }
      }
    },
    closeForm() {
      console.log(123);
      this.$emit("closeForm");
    },
  },
};
</script>

<style module>
.error-message {
  color: red;
  font-size: 12px;
}
.success-message {
  color: green;
}

.invalid {
  border: 1px solid red;
}

.input-wrp {
  text-align: left;
  margin-bottom: 5px;
}

.input-wrp label {
  min-width: 100px;
}
.buttons-wrp {
  display: flex;
  gap: 5px;
  justify-content: center;
}
</style>
