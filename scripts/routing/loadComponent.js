export const createLoadComponent = (config) => {
    const routes = {
        '/': `${config.componentURL}home.html`,
        '/login': `${config.componentURL}login.html`,
        '/register': `${config.componentURL}register.html`,
        '/gagarin': `${config.componentURL}gagarin.html`,
        '/flights': `${config.componentURL}flights.html`,
        '/search': `${config.componentURL}search.html`,
        '/moon-order': `${config.componentURL}moon-order.html`,
        '/missions': `${config.componentURL}missions.html`,
        '/edit-mission': `${config.componentURL}edit-mission.html`,
    }

    return function loadComponent(path, callBackRoute) {
        const app = document.getElementById('app');
        const route = routes[path] || '/';
        app.classList.add('fade-out')

        const fadeOutEnd = () => {
            app.removeEventListener('animationend', fadeOutEnd)
            app.classList.remove('fade-out')

            fetch
            (route)
                .then(response => response.text())
                .then(html => {
                    app.innerHTML = html;
                })
                .finally(() => {
                    app.classList.add('fade-in')
                    if (callBackRoute[path]) {
                        callBackRoute[path]()
                    }
                })
        }
        app.addEventListener('animationend', fadeOutEnd)
    }
}

export const createRoute = (loadComponent) => {
    const callBackRoute = {};
    return {
        init() {
            const onPathPage = () => {
                const path = window.location.hash.substring(1) || '/'
                loadComponent(path, callBackRoute);
            }
            window.addEventListener('hashchange', onPathPage);
            onPathPage();
        },
        onRoute(path, callBack) {
            callBackRoute[path] = callBack;
        },
    }
}