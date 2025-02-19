import toaster from "../../ui/toaster.js";
import formValidator from "../../helpers/formValidator.js";

export function addCrew() {
    const crewList = document.getElementById('crewList');

    function createCrew() {
        const crewDiv = document.createElement('div');
        crewDiv.classList.add('mb-3');

        crewDiv.innerHTML = ` 
      <input type="text" class="form-control" placeholder="Имя космонавта" name="crew">
      <input type="text" class="form-control" placeholder="ранг" name="crew_rank">
      <div class="invalid-feedback test-1-emph">Error message</div>
        `

        return crewDiv;
    }

    document.querySelector('.addCrewMember').addEventListener('click', () => {
        crewList.appendChild(createCrew());
    })
    document.querySelector('.removeCrewMember').addEventListener('click', () => {
        if (crewList.childElementCount > 1) {
            crewList.lastChild.remove();
        }
    })
}

function editMission(apiUrl, path, toasterText) {
    const form = document.getElementById('editMissionForm');
    const missionName = document.getElementById('mission-name')
    const missionParse = sessionStorage.getItem('mission');
    const mission = JSON.parse(missionParse);
    missionName.textContent = mission.mission.name;

    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const result = {}
        formData.forEach((value, key) => {
            if (result[key]) {
                if (!Array.isArray(result[key])) {
                    result[key] = [result[key]];
                }
                result[key].push(value);
            } else {
                result[key] = value
            }

        });

        console.log(result);

        const data = {
            mission: {
                name: result.name,
                launch_details: {
                    launch_date: result.launch_date,
                    launch_site: {
                        name: result.launch_site,
                        location: {
                            latitude: result.launch_latitude,
                            longitude: result.launch_longitude,
                        }
                    }
                },
                landing_details: {
                    landing_date: result.landing_date,
                    landing_site: {
                        name: result.landing_site,
                        coordinates: {
                            latitude: result.landing_latitude,
                            longitude: result.landing_longitude,
                        }
                    }
                },
                spacecraft: {
                    command_module: result.command_module,
                    lunar_module: result.lunar_module,
                    crew: Array.isArray(result.crew) ? result.crew.map((name, index) => ({
                        name: name,
                        rank: result.crew_rank[index],
                    })) : {
                        name: result.crew,
                        rank: result.crew_rank,
                    }
                }
            }
        }
        fetch(`${apiUrl}/${mission.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.headers.get('content-type')) {
                    return response.json();
                }
            })
            .then(data => {
                if (!data?.error) {
                    window.location.hash = path;
                    if (toasterText) {
                        toaster(toasterText, '#69cd69')
                    }
                } else {
                    formValidator(form, data);
                }
            })
    })
}

export default editMission;