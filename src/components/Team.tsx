import React, { ReactElement } from 'react';
import { getTeam } from '../api';

interface Player {
  name: string;
  position: string;
  teamId: string;
  number: number;
  avatar: string;
  rpg: number;
  spg: number;
  apg: number;
  ppg: number;
}

interface TeamData {
  id: string;
  name: string;
  wins: number;
  losses: number;
  established: number;
  coach: string;
  manager: string;
  championships: number[];
  players: Player[];
}

interface Props {
  id: string | undefined;
  children(team: TeamData | null): ReactElement;
}

const Team: React.FC<Props> = props => {
  const [team, setTeam] = React.useState(null);

  const fetchTeam = (id: string | undefined) => {
    setTeam(null);

    getTeam(id).then(team => setTeam(team));
  };

  React.useEffect(() => {
    fetchTeam(props.id);
  }, [props.id]);

  return props.children(team);
};

export default Team;
