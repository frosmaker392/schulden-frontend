export const extractFromForm = (formRef: HTMLFormElement | null, key: string) => {
  return formRef?.[key].value ?? ''
}
