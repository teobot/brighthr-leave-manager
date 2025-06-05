const boldMatchingText = (text: string, search: string) => {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, "<b class='font-bold'>$1</b>");
};

export { boldMatchingText };
