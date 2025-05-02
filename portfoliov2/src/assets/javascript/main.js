document.getElementById('menu-toggle').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

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

            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});


window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

///////////////////////////////////////////
function updateCoverflowCarousel(centerIndex) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
        card.classList.remove('center', 'left', 'right', 'far-left', 'far-right');
        card.style.display = '';
        if (i === centerIndex) {
            card.classList.add('center');
        } else if (i === centerIndex - 1) {
            card.classList.add('left');
        } else if (i === centerIndex + 1) {
            card.classList.add('right');
        } else if (i === centerIndex - 2) {
            card.classList.add('far-left');
        } else if (i === centerIndex + 2) {
            card.classList.add('far-right');
        } else {
            card.style.display = 'none';
        }
    });
}

function initCoverflowCarousel() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    let centerIndex = 0;

    updateCoverflowCarousel(centerIndex);

    // Navigation
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    function updateButtons() {
        prevBtn.disabled = centerIndex === 0;
        nextBtn.disabled = centerIndex === cards.length - 1;
    }

    prevBtn.addEventListener('click', function () {
        if (centerIndex > 0) {
            centerIndex--;
            updateCoverflowCarousel(centerIndex);
            updateButtons();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (centerIndex < cards.length - 1) {
            centerIndex++;
            updateCoverflowCarousel(centerIndex);
            updateButtons();
        }
    });

    cards.forEach((card, i) => {
        card.addEventListener('click', function (e) {
            if (i !== centerIndex) {
                e.stopPropagation();
                centerIndex = i;
                updateCoverflowCarousel(centerIndex);
                updateButtons();
            }
        });
    });

    updateButtons();
}

function initProjectsDetails() {
    const projects = {
        8: {
            title: "Eco-Tec Cycle",
            description: "Plateforme web éco-responsable pour sensibiliser, localiser et encourager le recyclage des équipements électroniques. Authentification sécurisée, carte interactive, animations modernes et suivi d'impact utilisateur.",
            features: [
                "Carte interactive des points de collecte et de réparation (Leaflet + filtres dynamiques)",
                "Articles pédagogiques sur le recyclage, la loi AGEC, l'indice de réparabilité, etc.",
                "Tableau de bord utilisateur : statistiques, historique, suggestions personnalisées",
                "Authentification sécurisée (Google OAuth, email/mot de passe) avec NextAuth.js",
                "Animations fluides au scroll et transitions de page (Framer Motion)",
                "Interface responsive et moderne avec TailwindCSS",
                "Gestion des utilisateurs et des données avec Prisma + PostgreSQL"
            ],
            technologies: [
                "Next.js", "React", "TailwindCSS", "Framer Motion", "Prisma", "PostgreSQL", "NextAuth.js", "Leaflet"
            ],
            demoContent: `
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
                    <source src="./assets/videos/ecotecvideo.mp4" type="video/mp4">
                    Votre navigateur ne supporte pas les vidéos HTML5
                </video>
            `,
            demoBg: "bg-green-100 bg-opacity-10",
            links: [
                {
                    url: "https://github.com/youcefaddou/eco-tec_cycle",
                    icon: "fab fa-github",
                    text: "Code"
                },
                {
                    url: "https://ecotec-cycle.vercel.app/",
                    icon: "fas fa-external-link-alt",
                    text: "Démo"
                }
            ]
        },

        7: {
            title: "Landing Page NexaDigital",
            description: "Landing page moderne pour agence digitale avec formulaire de contact connecté à une base MySQL, animations au scroll, et gestion des abonnements à la newsletter.",
            features: [
                "Formulaire de contact avec validation (nom, email, téléphone, message)",
                "Enregistrement des messages dans la base de données MySQL via Express.js et Prisma",
                "Animations d'apparition au scroll (React hooks + CSS)",
                "Section newsletter prête à connecter au backend",
                "Interface responsive et moderne avec React et TailwindCSS"
            ],
            technologies: ["React", "TailwindCSS", "Express.js", "MySQL", "Prisma"],
            demoContent: `
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
                    <source src="./assets/videos/nexadigitalvideo.mp4" type="video/mp4">
                    Votre navigateur ne supporte pas les vidéos HTML5
                </video>
            `,
            demoBg: "bg-primary bg-opacity-10",
            links: [
                {
                    url: "https://github.com/youcefaddou/NexaDigital.git",
                    icon: "fab fa-github",
                    text: "Code"
                },
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
                <img src="./assets/images/Capture.PNG" alt="Aperçu du projet Majordhomm" class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
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
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
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
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
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
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
                    <source src="./assets/videos/maze.webm" type="video/webm">
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
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
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
                <video controls autoplay loop muted class="w-fit-content h-full object-cover rounded-xl" loading="lazy">
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

            // Ajoute loading="lazy" sur les images/vidéos injectées dynamiquement
            projectDemo.querySelectorAll('img,video').forEach(el => {
                el.setAttribute('loading', 'lazy');
            });

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
    // Recherche plus robuste des sections
    const experienceSection = document.querySelector('#experience, [id*="experience"]');
    const educationSection = document.querySelector('#education, [id*="education"]');

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
    window.addEventListener('resize', animateTimelineItems);
    animateTimelineItems();
}
function animateAbout() {
    const aboutTitle = document.querySelector('.about-title');
    if (!aboutTitle) return;
    const spans = aboutTitle.querySelectorAll('span');
    if (typeof anime === 'function' && spans.length > 0) {
        anime({
            targets: spans,
            translateY: [
                { value: '-2.75rem', easing: 'easeOutExpo', duration: 600 },
                { value: 0, easing: 'easeOutBounce', duration: 800, delay: 100 }
            ],
            rotate: {
                value: '1turn',
                easing: 'easeInOutCirc',
                duration: 1000
            },
            delay: (el, i) => i * 80,
            easing: 'easeInOutCirc',
            loop: true,
            loopDelay: 1000,
            direction: 'alternate',
            endDelay: 1000
        });
    } else {
        console.error('Erreur: anime.js non chargé ou spans introuvables');
    }
}

function animateHeroSection() {
    const heroElements = document.querySelectorAll('.hero-animate');
    if (typeof anime === 'function' && heroElements.length > 0) {
        anime({
            targets: heroElements,
            opacity: [0, 1],
            translateY: [100, 0],
            duration: 1600,
            delay: anime.stagger(140),
            easing: 'cubicBezier(.22,1,.36,1)'
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    initCoverflowCarousel();
    initProjectsDetails();
    initTimeline();
    animateAbout();
    animateHeroSection();
    const projectDemoVideo = document.querySelector('#project-demo video');
    if (projectDemoVideo) {
        projectDemoVideo.addEventListener('loadedmetadata', adjustVideoSize);
    }
    window.addEventListener('resize', adjustVideoSize);
});

