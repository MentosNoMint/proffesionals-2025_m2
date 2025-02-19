const gagarinFlight = async (apiUrl) => {
    const response = await fetch(apiUrl, {
        method: 'GET',
    })

    const data = await response.json();
    return data.data;
}

export const viewGagarinFlight = async (apiUrl) => {
    const box = document.querySelector('.gagarin-flight');
    const data = await gagarinFlight(apiUrl);

    const gagarinInfo = data.map((gagarinFlight) => {
        const data = gagarinFlight[0].cosmonaut[0];
        return `
            <h2 class="text-center mb-4">${data.name}</h2>
    <p>${data.birthdate}</p>
    <span>${data.rank}</span>
    <span>${data.bio.career}</span>
    <span>${data.bio.early_life}</span>
    <span>${data.bio.post_flight}</span>
      <button class="btn btn-primary" onclick="location.hash='/missions'">К списку миссий</button>
        `
    }).join('');

    return box.innerHTML = gagarinInfo;
}