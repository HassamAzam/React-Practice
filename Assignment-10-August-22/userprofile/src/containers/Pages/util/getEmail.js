const getEmail = (email, userArray) =>
  userArray.find((user) => user.email === email);

export default getEmail;
