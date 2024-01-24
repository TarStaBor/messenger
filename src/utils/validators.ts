export const email = (value: string) => {
  const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  if (!emailPattern.test(value)) {
    return "Неверный формат почты";
  }
  return false;
};

// eslint-disable-next-line consistent-return
export const login = (value: string) => {
  if (value.length < 3 || value.length > 20) {
    return "Логин должен содержать от 3 до 20 символов";
  }
  const spacesPattern = /\s/;
  if (spacesPattern.test(value)) {
    return "Логин не должен содержать пробелы";
  }
  const specialSignsPattern = /[^a-zA-Z0-9-_]/;
  if (specialSignsPattern.test(value)) {
    return "Допустим только дефис и нижнее подчеркивание";
  }
  const latinWithNumbersPattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]+$/;
  if (!latinWithNumbersPattern.test(value)) {
    return "Логин не должен состоять из цифр и кириллицу";
  }
};

const namesValidators = (value: string) => {
  const cyrillicPattern = /^[а-яА-ЯёЁ\s]+$/;
  const latinPattern = /^[a-zA-Z\s]+$/;
  if (!cyrillicPattern.test(value) && !latinPattern.test(value)) {
    return "Цифры и пробелы недопустимы, кроме дефиса";
  }
  const firstLetterNotCapitalPattern = /^[^A-ZА-ЯЁ]/;
  if (firstLetterNotCapitalPattern.test(value)) {
    return "Первая буква должна быть заглавной";
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
export const first_name = (value: string) => namesValidators(value);
// eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
export const second_name = (value: string) => namesValidators(value);

export const phone = (value: string) => {
  if (value.length < 10 || value.length > 15) {
    return "Пароль должен содержать от 10 до 15 символов";
  }
  const phonePattern = /^\+?\d+$/;
  if (!phonePattern.test(value)) {
    return "Пароль должен состоять из цифр, может начинается с плюса";
  }
  return false;
};

export const password = (value: string) => {
  if (value.length < 8 || value.length > 40) {
    return "Пароль должен содержать от 8 до 40 символов";
  }
  const uppercasePattern = /[A-Z]/;
  if (!uppercasePattern.test(value)) {
    return "Пароль должен содержать хотя бы одну заглавную букву";
  }
  const digitPattern = /\d/;
  if (!digitPattern.test(value)) {
    return "Пароль должен содержать хотя бы одну цифру";
  }
  return false;
};

export const message = (value: string) => {
  if (!value.trim()) {
    return "Сообщение не должно быть пустым";
  }
  return false;
};
