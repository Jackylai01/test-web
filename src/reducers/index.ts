import clientAuth from './client/auth';
import clientGame from './client/game';
import clientPrizeRecipient from './client/prize-recipient';
import clientTeam from './client/team';
import fileUpload from './file-upload';
import game from './game';
import layout from './layout';
import publicPrizeRecipient from './public/prize-recipient';
import publicViews from './public/views';
import socketGame from './socket-game';

const appReducer = {
  layout,
  game,
  fileUpload,
  publicViews,
  publicPrizeRecipient,
  clientAuth,
  clientTeam,
  clientGame,
  clientPrizeRecipient,
  socketGame,
};

export default appReducer;
