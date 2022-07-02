export const getInputErrorMessage = (formErrors: Record<string, any>, inputName?: string) => {
  if (!inputName) {
    return;
  }

  if (inputName in formErrors) {
    return formErrors[inputName].message;
  }
};
