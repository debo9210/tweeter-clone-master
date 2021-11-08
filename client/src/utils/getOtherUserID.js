export const getOtherUserID = (otherUsers, name) => {
  let otherUserID;
  if (otherUsers) {
    otherUsers
      .filter((user) => user.name === name)
      .map((user) => (otherUserID = user._id));
  }
  return otherUserID;
};
