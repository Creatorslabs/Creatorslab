export const generateRandomUsername = (): string => {
  const adjectives = ["Swift", "Brave", "Clever", "Mighty", "Silent", "Rapid", "Lucky", "Dark", "Loyal", "Fierce"];
  const nouns = ["Panda", "Hawk", "Wolf", "Tiger", "Eagle", "Dragon", "Falcon", "Lion", "Shadow", "Knight"];
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}${randomNumber}`;
};
