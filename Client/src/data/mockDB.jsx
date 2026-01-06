export const teams = [
  { id: 1, name: "Team A", logo: "team_a_logo.png" },
  { id: 2, name: "Team B", logo: "team_b_logo.png" },
  { id: 3, name: "Team C", logo: "team_c_logo.png" },
  { id: 4, name: "Team D", logo: "team_d_logo.png" },
  { id: 5, name: "Team E", logo: "team_e_logo.png" },
  { id: 6, name: "Team F", logo: "team_f_logo.png" },
  { id: 7, name: "Team G", logo: "team_g_logo.png" },
  { id: 8, name: "Team H", logo: "team_h_logo.png" },
  { id: 9, name: "Team I", logo: "team_i_logo.png" },
  { id: 10, name: "Team J", logo: "team_j_logo.png" },
  { id: 11, name: "Team K", logo: "team_k_logo.png" },
    { id: 12, name: "Team L", logo: "team_l_logo.png" },
    { id: 13, name: "Team M", logo: "team_m_logo.png" },
    { id: 14, name: "Team N", logo: "team_n_logo.png" }
];

export const fechas = [
    { id: 1, fecha: "10-01-2026", ubicacion: "Plaza 1", estado: "Finalizado",
        posicionesFinales: [
            { teamId: 1, points: 85 },
            { teamId: 2, points: 78 },
            { teamId: 3, points: 92 },
            { teamId: 4, points: 88 },
            { teamId: 5, points: 76 },
            { teamId: 6, points: 81 },
            { teamId: 7, points: 95 },
            { teamId: 8, points: 79 },
            { teamId: 9, points: 84 },
            { teamId: 10, points: 90 },
            { teamId: 11, points: 77 },
            { teamId: 12, points: 83 },
            { teamId: 13, points: 89 },
            { teamId: 14, points: 80 }
        ]
    },
    { id: 2, fecha: "15-01-2026", ubicacion: "Plaza 2", estado: "Pendiente",
        posicionesFinales: []
    }
]

export const partidos = [
    { id: 1, teamAId: 1, teamBId: 2, scoreA: 7, scoreB: 11},
    { id: 2, teamAId: 3, teamBId: 4, scoreA: 11, scoreB: 9},
    { id: 3, teamAId: 5, teamBId: 6, scoreA: 11, scoreB: 5},
    { id: 4, teamAId: 7, teamBId: 8, scoreA: 8, scoreB: 11},
    { id: 5, teamAId: 9, teamBId: 10, scoreA: 11, scoreB: 2},
    { id: 6, teamAId: 11, teamBId: 12, scoreA: 6, scoreB: 11},
    { id: 7, teamAId: 13, teamBId: 14, scoreA: 11, scoreB: 4}
]

export function obtenerTablaGeneral() {
    const tabla = {};
    teams.forEach(team => {
        tabla[team.id] = {
            id: team.id,
            nombre: team.name,   
            logo: team.logo,     
            puntos: 0,           
        };
    });

    fechas.forEach(match => {
        if (match.estado === "Finalizado") {
            match.posicionesFinales.forEach(resultado => {
                const idEquipo = resultado.teamId;
                const puntosGanados = resultado.points;
                if (tabla[idEquipo]) {
                    tabla[idEquipo].puntos += puntosGanados;
                }
            });
        }
    });
    const listaOrdenada = Object.values(tabla).sort((a, b) => b.puntos - a.puntos);

    return listaOrdenada;
}
export function obtenerPartidoById(id){
    return partidos.find(partido => partido.id === id);
}

export function obtenerPartidoCompleto(idPartido) {
    const partido = partidos.find(p => p.id === idPartido);
    if (!partido) return null;

    const teamA = teams.find(t => t.id === partido.teamAId);
    const teamB = teams.find(t => t.id === partido.teamBId);

    return {
        ...partido, 
        teamA,      
        teamB       
    };
}