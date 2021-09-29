import SubTeam from '../models/user.js';

export const getSubTeams = async (req, res) => {
    try {
        const subTeams = await SubTeam.find();
        res.status(200).json(subTeams);

    } catch(error) {
        res.status(404).json({message: error.message});

    }
}

export const createSubTeam = (req, res) => {
   try {
       
   } catch (error) {
       
   }
}