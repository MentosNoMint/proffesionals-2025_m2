import toaster from "../../ui/toaster.js";

export async function getMissions(apiUrl) {
    try {
        const response = await fetch(apiUrl)
        const data = await response.json();
        renderMissions(data, apiUrl);
    } catch (error) {
        console.error(error)
    }
}

function renderMissions(missions, apiUrl) {
    const missionContainer = document.querySelector('.mission-container');
    missionContainer.innerHTML = '';
    missions.forEach((mission, index) => {
        const {landing_details, launch_details, name, spacecraft} = mission['mission'];
        const crewArray = [...spacecraft.crew][0]

        const crewHtml = crewArray.length > 0 ? crewArray.map(crewMember => `
                <div class="crew-member flex flex-col">
                    <span>Роль: ${crewMember.role || 'Не указано'}</span>
                    <span>Имя: ${crewMember.name || 'Не указано'}</span>
                </div>
            `).join('') : '<p>Экипаж не указан</p>'

        const missionHtml = `
           <div class="accordion" id="missionAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${index}">
                       ${name}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse show" data-bs-parent="#missionAccordion">
                    <div class="accordion-body">
                        <p>Дата запуска: ${launch_details.launch_date}</p>
                        <p>Дата посадки: ${landing_details.landing_date}</p>
                        <p>Место запуска: ${launch_details.launch_site.name}</p>
                        <p>Широта: ${launch_details.location.latitude}</p>
                        <p>Долгота: ${launch_details.location.longitude}</p>  
                        <p>Место посадки: ${landing_details.landing_site.name}</p>
                        <p>Широта: ${landing_details.landing_site.coordinates.latitude}</p>
                        <p>Долгота: ${landing_details.landing_site.coordinates.longitude}</p> 
                        <p>Лунный модуль: ${spacecraft.lunar_module}</p> 
                        <p>Управляющий модуль: ${spacecraft.command_module}</p>
                        <h5>Экипаж:</h5>
                        ${crewHtml}
                        <button class="btn btn-danger" data-id="${mission.id}">Удалить</button>
                        <button class="btn btn-warning" data-id="${mission.id}"">Редактировать</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        missionContainer.innerHTML += missionHtml;

        document.querySelectorAll('.accordion-body .btn.btn-danger').forEach(button => {
            button.addEventListener('click', () => {
                deleteMission(button.dataset.id, apiUrl, button.closest('.accordion'));
            })
        })

        document.querySelectorAll('.accordion-body .btn.btn-warning').forEach(button => {
            button.addEventListener('click', () => {
            const mission = missions.find(mission => mission.id === Number(button.dataset.id));
                window.location.hash = '#/edit-mission';
                sessionStorage.setItem('mission', JSON.stringify(mission));
            })
        })
    })
}



function deleteMission(missionId, apiUrl, element) {
    element.remove()
    toaster('Миссия успешно удалена', '#69cd69')
    fetch(`${apiUrl}/${missionId}`, {
        method: 'DELETE',
    })

}