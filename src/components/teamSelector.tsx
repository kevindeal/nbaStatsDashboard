import React, { useEffect, useState } from 'react';
import { fetchAllTeams } from '../api/nbaApi';

interface Team {
  id: number;
  name: string;
  logo: string;
}

const TeamSelector: React.FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState({ id:27, name: 'Philadelphia 76ers', logo: '	https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'})

  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoading(true);
        const nbaTeams = await fetchAllTeams();
        setTeams(nbaTeams);
        setLoading(false);
      }catch (err) {
        setError('Failed to fetch teams');
        setLoading(false);
      }
    };
    getTeams();
  }, []);


  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  return (
    <div>
      <h1>Select a Team</h1>
      <button onClick={toggleDropDown}>
        {selectedTeam ? (
          <span className="flex">
            <img src={selectedTeam.logo} alt={selectedTeam.name} className="w-6 h-6 mr-2" />
            {selectedTeam.name}
          </span>
        ) : (
          'Select a Team'
        )}
        {isDropDownOpen ? 'Close Dropdown' : 'Open Dropdown'}
      </button>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}


      {isDropDownOpen && (
        <ul>
          {teams.map((team) => (
            <li 
            key={team.id}
            className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer">
              <img src={team.logo}
              alt={`${team.name} logo`}
              className="w-8 h-8 rounded-full mr-3" />
              <span className="flex-1 text-left">{team.name}</span>
              <span className="text-sm text-gray-500">ID: {team.id}</span>
            </li>
          ) )}
        </ul>
      )}
    </div>
  );
};

export default TeamSelector;