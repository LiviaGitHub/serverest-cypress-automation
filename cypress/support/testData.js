export const generateUniqueEmail = () =>
  `qa.automation.${Date.now()}.${Math.floor(Math.random() * 10000)}@test.com`;

export const generateUniqueProductName = () =>
  `Automation Product ${Date.now()} ${Math.floor(Math.random() * 10000)}`;
