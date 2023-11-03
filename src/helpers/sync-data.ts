export const updateSyncData = (
  syncData: any,
  playerOrder: number,
  newData: any,
) => {
  const newSyncData = { ...syncData };
  const playerData = newSyncData.players[playerOrder];

  newSyncData.players = newSyncData.players.map((player: any, index: number) =>
    index === playerOrder ? { ...playerData, ...newData } : player,
  );

  return newSyncData;
};
