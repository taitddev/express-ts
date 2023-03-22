import unidecode from "unidecode";

export const generateUsername = (
  firstName: string,
  lastName: string
): string => {
  const englishFirstName = unidecode(firstName.toLowerCase());
  const englishLastName = unidecode(lastName.toLowerCase());
  const username =
    englishFirstName + englishLastName + Math.floor(Math.random() * 1000);
  return username;
};
