import { combineComponents } from "./combineComponents";
import { AthletesProvider } from "./AthleteProvider";
import { PostProvider } from './PostProvider';
import { LiftProvider } from './LiftProvider';
import { TeamProvider } from "./TeamProvider";
import { MaxLiftProvider } from "./MaxLiftProvider";
import { AthleteByTeamProvider } from "./AthleteByTeam";
import { BellRingerProvider } from "./BellringerProvider";



const providers = [
  AthletesProvider,
  PostProvider,
  LiftProvider,
  TeamProvider,
  MaxLiftProvider,
  AthleteByTeamProvider,
  BellRingerProvider,


];
export const AppContextProvider = combineComponents(...providers);
