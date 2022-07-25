const MAX_DEX_ID = 493;

export const getRandomPokeon: (notThisOne?: number) => number = (
  notThisOne?: number
) => {
  const pokedexNumber = Math.floor(Math.random() * (MAX_DEX_ID - 1) + 1);
  if (pokedexNumber !== notThisOne) return pokedexNumber;
  return getRandomPokeon(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokeon();
  const secondId = getRandomPokeon(firstId);
  return [firstId, secondId];
};
