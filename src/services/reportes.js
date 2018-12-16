const avatarUrl = require("./generateAvatar");

const getReportes = function() {
    return [
        {
          name: 'Juan Perez',
          ultimaVista: 'Sopocachi',
          descripcion:'asdasdas',
          avatar: avatarUrl,
        },
        {
          name: 'thot leader',
          ultimaVista: 'Bella Vista',
          descripcion: 'SE ',
          avatar: avatarUrl,
        },
        {
          name: 'jsa',
          ultimaVista: 'Sopocachi',
          avatar: avatarUrl,
        },
        {
          name: 'talhaconcepts',
          ultimaVista: 'Sopocachi',
          avatar: avatarUrl,
        },
        {
          name: 'andy vitale',
          ultimaVista: 'San Miguel',
          avatar: avatarUrl,
        },
        {
          name: 'katy friedson',
          ultimaVista: 'Miraflores',
          avatar: avatarUrl,
        },
      ];
  };
  
  export default {
    getReportes,
  };
  