const axios = require('axios').default

const baseURL = '/tlg/'

const fetchTeamLiftHistory = async (team) => {
  const url = baseURL + 'lift-history/'
  axios.get(url, {
    params: {
      team: team
    }
  })
  .then(function (response) {
    // handle success
    // console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

const fetchAthleteLiftHistory = async (athlete_id) => {
  const url = baseURL + 'lift-history/' + athlete_id + '/'
  axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

const fetchNewLiftToHistory = async (new_lift_data) => {
  const url = baseURL + 'lift-history/'
  axios.post(url, {
    new_lift_data
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}



const exportItems = {
  fetchTeamLiftHistory, 
  fetchAthleteLiftHistory,
  fetchNewLiftToHistory,
}

export default exportItems