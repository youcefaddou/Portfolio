import * as THREE from 'three';

const BAND_WIDTH = 250; // Largeur des bandes en px

function resizeCanvas() {
  const width = 250; // Mets la même valeur qu'en CSS
  const height = window.innerHeight;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = width;
  canvas.height = height;
  canvas.style.zIndex = '0';
  canvas.style.background = 'transparent';
  return { width, height };
}

function getHeroElement() {
  // Recherche robuste du hero (id exact ou partiel)
  return document.getElementById('home') || document.querySelector('[id*="home"], [id*="hero"]');
}

const left = document.getElementById('sideCanvasLeft');
const right = document.getElementById('sideCanvasRight');
if (left) {
  left.style.position = 'absolute';
  left.style.zIndex = '2';
  left.style.background = 'transparent';
  left.style.top = '0';
  left.style.height = '100%';
  left.style.width = BAND_WIDTH + 'px';
}
if (right) {
  right.style.position = 'absolute';
  right.style.zIndex = '2';
  right.style.background = 'transparent';
  right.style.top = '0';
  right.style.height = '100%';
  right.style.width = BAND_WIDTH + 'px';
}

if (left || right) {
  const renderLeft = left ? setupSideAnimation('sideCanvasLeft', 'left') : null;
  const renderRight = right ? setupSideAnimation('sideCanvasRight', 'right') : null;

  function animate(time) {
    if (renderLeft) renderLeft(time);
    if (renderRight) renderRight(time);
    requestAnimationFrame(animate);
  }
  animate(0);
}

// Animation sur les bandes latérales avec Three.js

function getFooterHeight() {
  const footer = document.querySelector('footer');
  return footer ? footer.offsetHeight : 200;
}

function getHeroHeight() {
  const hero = document.getElementById('home');
  return hero ? hero.offsetHeight : 480;
}

function getHeroBottom() {
  const hero = getHeroElement();
  if (!hero) return 0;
  const rect = hero.getBoundingClientRect();
  return rect.top + window.scrollY + hero.offsetHeight;
}

function getFooterTop() {
  const footer = document.querySelector('footer');
  if (!footer) return document.body.scrollHeight;
  const rect = footer.getBoundingClientRect();
  return rect.top + window.scrollY;
}

function setupSideAnimation(canvasId, side = 'left') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  function resizeCanvas() {
    // Les bandes couvrent automatiquement toute la hauteur de .sections-container
    const container = document.querySelector('.sections-container');
    if (!container) return { width: BAND_WIDTH, height: 0 };
    const rect = container.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const height = container.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.left = side === 'left' ? '0' : '';
    canvas.style.right = side === 'right' ? '0' : '';
    canvas.style.top = top + 'px';
    canvas.style.height = height + 'px';
    canvas.style.width = BAND_WIDTH + 'px';
    canvas.width = BAND_WIDTH;
    canvas.height = height;
    canvas.style.zIndex = '2';
    canvas.style.background = 'transparent';
    return { width: BAND_WIDTH, height };
  }

  let { width, height } = resizeCanvas();

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(width, height, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 3;

  // Adapte la géométrie du plan à la taille du canvas pour qu'il le remplisse entièrement
  let aspect = height / width;
  let planeGeometry = new THREE.PlaneGeometry(1, aspect);
  const planeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      bandPos: { value: 0 }, // position verticale du faisceau (0 en haut, 1 en bas)
      beamWidth: { value: 0.22 }, // largeur du faisceau
      baseColor1: { value: new THREE.Color('#f3f4f6') }, // Gris clair (haut)
      baseColor2: { value: new THREE.Color('#60a5fa') }, // Bleu doux (bas)
      lightColor: { value: new THREE.Color('#ffffff') }, // Faisceau blanc pur
      isDark: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float bandPos;
      uniform float beamWidth;
      uniform vec3 baseColor1;
      uniform vec3 baseColor2;
      uniform vec3 lightColor;
      uniform float isDark;
      varying vec2 vUv;
      const float BAND_WIDTH = 250.0;
      // Fonction de bruit simple (grain)
      float random(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
      }
      // Glassmorphism: blur simple par moyenne de voisins
      vec3 blurredBase(vec2 uv) {
        vec3 sum = vec3(0.0);
        float wsum = 0.0;
        float blur = 0.012; // force du blur
        for (int x = -2; x <= 2; x++) {
          for (int y = -2; y <= 2; y++) {
            float weight = 1.0 - 0.15 * (abs(float(x)) + abs(float(y)));
            float t = clamp(uv.x + float(x) * blur, 0.0, 1.0);
            // Dégradé horizontal en 3 stops (bord -> centre -> bord)
            vec3 leftColorLight = vec3(0.117, 0.227, 0.541);
            vec3 midColorLight = vec3(0.145, 0.388, 0.921);
            vec3 rightColorLight = vec3(0.38, 0.65, 0.98);
            vec3 leftColorDark = vec3(0.13, 0.18, 0.25);
            vec3 rightColorDark = vec3(0.0, 0.0, 0.0);
            vec3 leftColor = mix(leftColorLight, leftColorDark, isDark);
            vec3 midColor = mix(midColorLight, leftColorDark, isDark);
            vec3 rightColor = mix(rightColorLight, rightColorDark, isDark);
            vec3 base;
            if (t < 0.5) {
              base = mix(leftColor, midColor, t * 2.0);
            } else {
              base = mix(midColor, rightColor, (t - 0.5) * 2.0);
            }
            float centerFade = smoothstep(0.18, 0.5, t) * (1.0 - smoothstep(0.5, 0.82, t));
            base = mix(base, rightColor, centerFade * 0.5 * (1.0 - isDark));
            sum += base * weight;
            wsum += weight;
          }
        }
        return sum / wsum;
      }
      void main() {
        // --- FOND GLASSMORPH + GRAIN ---
        vec3 base = blurredBase(vUv);
        // Ajoute un grain subtil
        float grain = random(vUv * BAND_WIDTH * 2.0 + time * 0.5);
        base += (grain - 0.5) * 0.08; // force du grain
        // --- FAISCEAU LUMINEUX ---
        float beamWidthPx = 20.0;
        float beamWidthUv = beamWidthPx / BAND_WIDTH;
        float zigzag = 0.18 * sin(12.0 * vUv.y + bandPos * 8.0 + time * 0.7)
                    + 0.08 * sin(32.0 * vUv.y + bandPos * 16.0 - time * 1.2);
        float centerX = 0.5 + zigzag;
        float dist = abs(vUv.x - centerX);
        float intensity = smoothstep(beamWidthUv, 0.0, dist);
        float halo = smoothstep(beamWidthUv * 2.0, beamWidthUv, dist);
        vec3 beam = lightColor * intensity * (1.2 + 0.5 * sin(time * 2.0));
        vec3 haloColor = lightColor * 0.18 * halo;
        // Mélange tout
        vec3 color = base + beam + haloColor;
        float alpha = 0.7 * intensity + 0.18 * halo + 0.25;
        // Ajoute un peu de transparence sur le fond pour l'effet glass
        alpha = mix(0.55, alpha, intensity + halo);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);

  function render(time) {
    // Calcule la position de la bande lumineuse selon le scroll
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let bandPos = 0;
    if (docHeight > 0) {
      bandPos = scrollTop / docHeight;
    }
    planeMaterial.uniforms.bandPos.value = bandPos;
    planeMaterial.uniforms.time.value = time * 0.001;
    renderer.render(scene, camera);
  }

  function handleResizeOrScroll() {
    const size = resizeCanvas();
    renderer.setSize(size.width, size.height, false);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    // Met à jour la géométrie du plan pour qu'elle remplisse le canvas
    const newAspect = size.height / size.width;
    plane.geometry.dispose();
    plane.geometry = new THREE.PlaneGeometry(1, newAspect);
  }

  window.addEventListener('resize', handleResizeOrScroll);
  window.addEventListener('scroll', handleResizeOrScroll);
  setTimeout(handleResizeOrScroll, 100);

  // Met à jour l'uniform en cas de changement de thème
  const observer = new MutationObserver(() => {
    const dark = document.body.getAttribute('data-theme') === 'dark';
    planeMaterial.uniforms.isDark.value = dark ? 1.0 : 0.0;
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

  return render;
}