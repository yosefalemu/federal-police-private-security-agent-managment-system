const truncateText = (text) => {
  const textAsString = String(text);

  if (textAsString.length < 15) {
    return textAsString;
  }

  return textAsString.substring(0, 15) + "...";
};

export default truncateText;
