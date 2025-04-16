// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});
///////////////////////////////////////////
function initCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const projectCards = document.querySelectorAll('.project-card');

    if (!carousel || !prevBtn || !nextBtn) return;

    let currentPosition = 0;
    const cardWidth = projectCards[0].offsetWidth + 32; // 32px pour mx-4 (16px de chaque côté)

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentPosition}px)`;
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition >= carousel.scrollWidth - carousel.clientWidth;
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentPosition = Math.max(currentPosition - cardWidth, 0);
        updateCarousel();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentPosition = Math.min(currentPosition + cardWidth, carousel.scrollWidth - carousel.clientWidth);
        updateCarousel();
    });

    updateCarousel();
}

document.addEventListener('DOMContentLoaded', function () {
    initCarousel();      // Doit venir en premier
    initProjectsDetails(); // En second
    initTimeline();
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const projects = document.querySelectorAll('.project-card');

    if (!carousel || !prevBtn || !nextBtn || projects.length === 0) return;

    let currentPosition = 0;
    const projectWidth = projects[0].offsetWidth + 32; // 32px pour les marges (mx-4 = 16px de chaque côté)
    const maxPosition = (projects.length - 1) * projectWidth;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentPosition}px)`;

        // Désactive les boutons quand on atteint les limites
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition >= maxPosition;
    }

    prevBtn.addEventListener('click', function () {
        currentPosition = Math.max(currentPosition - projectWidth, 0);
        updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
        currentPosition = Math.min(currentPosition + projectWidth, maxPosition);
        updateCarousel();
    });

    //initialisation
    updateCarousel();
});

// Détails projets à coté de la video
function initProjectsDetails() {
    const projects = {

        2: {
            title: "The Game of Life",
            description: "Implémentation interactive de l'automate cellulaire de Conway en JavaScript vanilla avec HTML5 Canvas.",
            features: [
                "Simulation des règles du jeu de la vie",
                "Contrôle de la vitesse de simulation",
                "Possibilité de dessiner des motifs",
                "Boutons de contrôle play/pause/clear"
            ],
            technologies: ["JavaScript", "HTML5 Canvas", "CSS Animations"],
            demoContent: `
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl">
                    <source src="./assets/videos/gameoflifevideo.webm" type="video/webm">
                    Votre navigateur ne supporte pas les vidéos HTML5
                </video>
            `,
            demoBg: "bg-blue-100",
            links: [
                {
                    url: "https://github.com/youcefaddou/The-Game-of-Life",
                    icon: "fab fa-github",
                    text: "Code"
                },
                {
                    url: "https://codepen.io/youcefaddou/pen/KKQjXQY",
                    icon: "fas fa-external-link-alt",
                    text: "Live Demo"
                }
            ]
        },
        1: {
            title: "Formulaire de Contact",
            description: "Application web complète pour la gestion des disponibilités et des coordonnées des utilisateurs, avec un back-end basé sur Express.js et une base de données MySQL.",
            features: [
                "Formulaire de contact avec validation des champs (nom, prénom, email, téléphone)",
                "Sélection des disponibilités (jour, heure, minutes)",
                "Envoi des données au serveur via une requête POST",
                "Stockage des données dans une base de données MySQL",
                "Interface utilisateur moderne avec React et TailwindCSS"
            ],
            technologies: ["React", "TailwindCSS", "Express.js", "MySQL", "Prisma"],
            demoContent: `
                <img src="./assets/images/Capture.PNG" alt="Aperçu du projet Majordhomm" class="w-fit-content h-full object-cover rounded-xl">
            `,
            demoBg: "bg-purple-100",
            links: [
                {
                    url: "https://github.com/youcefaddou/Majordhomm-test_Youcef",
                    icon: "fab fa-github",
                    text: "Code"
                },
            ]
        },
        3: {
            title: "The Maze Cat Runner - PHP",
            description: "Création d'un jeu de labyrinthe dynamique avec un système de vies en PHP avec HTML5 Canvas.",
            features: [
                "Plusieurs labyrinthes choisis aléatoirement à chaque début de partie",
                "Déplacements interactifs et controlés",
                "La souris se déplace également et fuit le chat",
                "Marteau qui permet de détruire les murs"
            ],
            technologies: ["PHP", "HTML5 Canvas", "CSS Animations"],
            demoContent: `
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl">
                    <source src="./assets/videos/gameoflifevideo.webm" type="video/webm">
                    Votre navigateur ne supporte pas les vidéos HTML5
                </video>
            `,
            demoBg: "bg-blue-100",
            links: [
                {
                    url: "https://github.com/youcefaddou/The-Maze-CatRunner-PHP-Game",
                    icon: "fab fa-github",
                    text: "Code"
                },
            ]
        },
        4: {
            title: "The Hangman",
            description: "Création d'un jeu du pendu dynamique avec un système de vies en JavaScript avec HTML5 et CSS.",
            features: [
                "Choix de mots aléatoires parmi plus de 3000 mots via une API externe",
                "Contrôle du volume de la musique",
                "Systèmes de vies restantes",
                "Affichage dynamique des lettres (in)/correctes"
            ],
            technologies: ["JavaScript", "HTML5 Canvas", "CSS Animations"],
            demoContent: `
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl">
                    <source src="./assets/videos/penduvideo.webm" type="video/webm">
                    Votre navigateur ne supporte pas les vidéos HTML5
                </video>
            `,
            demoBg: "bg-blue-100",
            links: [
                {
                    url: "https://github.com/youcefaddou/The-HangMan_v2",
                    icon: "fab fa-github",
                    text: "Code"
                },
            ]
        },
        5: {
            title: "Puissance 4",
            description: "Création d'un jeu Puissance 4 dynamique avec deux modes de jeu en JavaScript avec HTML5 et CSS.",
            features: [
                "Choix de 2 mode de jeux: Joueur 1 vs Joueur 2 ou Joueur VS CPU",
                "Système de gravité actif: les pièces tombent en bas de la grille",
                "Rythme de jeu régulier avec un intervalle régulier pour le CPU",
                "Affichage dynamique des messages de victoire ainsi que selon les tours, rouge ou jaune"
            ],
            technologies: ["JavaScript", "HTML5 Canvas", "CSS Animations"],
            demoContent: `
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl">
                    <source src="./assets/videos/puissancevideo.webm" type="video/webm">
                    Votre navigateur ne supporte pas les vidéos HTML5
                </video>
            `,
            demoBg: "bg-blue-100",
            links: [
                {
                    url: "https://github.com/youcefaddou/Connect-4",
                    icon: "fab fa-github",
                    text: "Code"
                },
            ]
        },
        6: {
            title: "Uni Handler",
            description: "Création d'une application de gestion d'école via API, en JavaScript avec HTML5 et CSS.",
            features: [
                "Gestion des promotions avec possibilité d'ajout, de modification et de suppression",
                "Gestion des étudiants avec possibilité d'ajout, de modification et de suppression",
                "Manipulation de données via une API custom spécialement conçue pour le projet",
                "Projet collaboratif avec utilisation de GIT et de ses commandes (push, pull, commit...)"
            ],
            technologies: ["JavaScript", "HTML5 Canvas", "CSS Animations"],
            demoContent: `
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl">
                    <source src="./assets/videos/unihandlervideo.webm" type="video/webm">
                    Votre navigateur ne supporte pas les vidéos HTML5
                </video>
            `,
            demoBg: "bg-blue-100",
            links: [
                {
                    url: "https://github.com/youcefaddou/Uni-Handler",
                    icon: "fab fa-github",
                    text: "Code"
                },
            ]
        },
        //  ici les autres projets 
    };

    // selection des éléments DOM
    const projectCards = document.querySelectorAll('.project-card');
    const detailsPanel = document.querySelector('.project-details');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectFeatures = document.getElementById('project-features');
    const projectTechnologies = document.getElementById('project-technologies');
    const projectLinks = document.getElementById('project-links');
    const projectDemo = document.getElementById('project-demo');

    if (!projectCards.length || !detailsPanel) return;

    projectCards.forEach(card => {
        card.addEventListener('click', function (e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];

            if (!project) return;

            // Update details panel
            projectTitle.textContent = project.title;
            projectDescription.textContent = project.description;

            projectFeatures.innerHTML = project.features.map(feature => `
                <div class="flex items-start mb-2">
                    <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>${feature}</span>
                </div>
            `).join('');

            projectTechnologies.innerHTML = project.technologies.map(tech => `
                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">${tech}</span>
            `).join('');

            projectLinks.innerHTML = project.links.map(link => `
                <a href="${link.url}" target="_blank" class="text-blue-600 hover:text-blue-800">
                    <i class="${link.icon} mr-1"></i> ${link.text}
                </a>
            `).join(' ');

            projectDemo.className = `h-64 flex items-center justify-center rounded-xl mb-4 ${project.demoBg}`;
            projectDemo.innerHTML = project.demoContent;

            detailsPanel.classList.remove('hidden');
            detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    //utilise la délégation d'événements
    document.addEventListener('click', function (e) {
        //gère les clics sur les cartes
        const card = e.target.closest('.project-card');
        if (card) {
            e.stopPropagation();
            const projectId = card.getAttribute('data-project');
            const project = projects[projectId];

            if (!project) return;

            // Mettez à jour le panel de détails
            document.getElementById('project-title').textContent = project.title;
            document.querySelector('.project-details').classList.remove('hidden');
        }

        // Gère les clics en dehors pour fermer le panel
        else if (!e.target.closest('.project-details')) {
            document.querySelector('.project-details').classList.add('hidden');
        }
    });
}

function adjustVideoSize() {
    const videos = document.querySelectorAll('#project-demo video');
    videos.forEach(video => {
        const containerRatio = video.parentElement.offsetWidth / video.parentElement.offsetHeight;
        const videoRatio = video.videoWidth / video.videoHeight;

        if (containerRatio > videoRatio) {
            video.style.width = '100%';
            video.style.height = 'auto';
        } else {
            video.style.width = 'auto';
            video.style.height = '100%';
        }
    });
}

// Timeline Animation
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const experienceSection = document.getElementById('experience');
    const educationSection = document.getElementById('education');

    if (!timelineItems.length) return;

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.80) &&
            rect.bottom >= (window.innerHeight * 0.20)
        );
    }

    function animateTimelineItems() {
        const experienceRect = experienceSection?.getBoundingClientRect();
        const educationRect = educationSection?.getBoundingClientRect();

        const isInExperience = experienceRect ?
            (experienceRect.top <= window.innerHeight && experienceRect.bottom >= 0) : false;
        const isInEducation = educationRect ?
            (educationRect.top <= window.innerHeight && educationRect.bottom >= 0) : false;

        if (!isInExperience && !isInEducation) return;

        timelineItems.forEach((item, index) => {
            if (isInViewport(item)) {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 100);
            } else {
                item.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', animateTimelineItems);
    animateTimelineItems();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initProjectsDetails();
    initTimeline();

    // Video size adjustment
    const projectDemoVideo = document.querySelector('#project-demo video');
    if (projectDemoVideo) {
        projectDemoVideo.addEventListener('loadedmetadata', adjustVideoSize);
    }
    window.addEventListener('resize', adjustVideoSize);
});