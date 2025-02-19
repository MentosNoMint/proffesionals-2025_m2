import initForm from "../auth/initForm.js";
import {fetchConfig} from "../config.js";
import {viewGagarinFlight} from "../pages/gagarin/gagarinFlight.js";
import {gagarinApiUrl, missionApiUrl} from "../helpers/API.js";
import {getMissions} from "../pages/missions/missions.js";
import editMission, {addCrew} from "../pages/missions/editMission.js";

export const routeHandler = {
    '/register': () => initForm(fetchConfig['/register']),
    '/login': () => initForm(fetchConfig['/login']),
    '/gagarin': () => viewGagarinFlight(gagarinApiUrl),
    '/missions': () => getMissions(missionApiUrl),
    '/edit-mission': () => {
        addCrew()
        editMission(missionApiUrl, '#/missions' , 'Миссия успешно редактирована')
    }
}