/**
 * Digestive System Explorer — Game Init
 */
/* eslint-disable no-undef */

/**
 * Register 3D scene handler for stomach
 */
window.SCENE_3D = {
  'digestion-3d-stomach': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfff7ed);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // Stomach shape: elongated torus-like mesh
    const stomachGeo = new THREE.TorusGeometry(2, 0.8, 32, 32);
    const stomachMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xfb923c,
      emissiveIntensity: 0.3,
      metalness: 0.2,
      roughness: 0.6
    });
    const stomach = new THREE.Mesh(stomachGeo, stomachMat);
    stomach.scale.y = 1.5;
    scene.add(stomach);

    // Acid wash effect: spherical mesh inside stomach with greenish tint
    const acidGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const acidMat = new THREE.MeshBasicMaterial({
      color: 0xc4b5a0,
      transparent: true,
      opacity: 0.3
    });
    const acid = new THREE.Mesh(acidGeo, acidMat);
    scene.add(acid);

    // Food particles (randomly distributed inside stomach)
    const foodParticles = [];
    for (let i = 0; i < 8; i++) {
      const particleGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const particleMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.1,
        roughness: 0.7
      });
      const particle = new THREE.Mesh(particleGeo, particleMat);
      particle.position.set(
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      scene.add(particle);
      foodParticles.push(particle);
    }

    // Lighting
    const mainLight = new THREE.DirectionalLight(0xfbbf24, 2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const ambientLight = new THREE.AmbientLight(0xfb923c, 1.2);
    scene.add(ambientLight);

    // Animation loop
    let time = 0;
    let animId;
    function animate() {
      time += 0.01;

      // Stomach rotation and undulation
      stomach.rotation.y += 0.003;
      stomach.rotation.z = Math.sin(time * 0.5) * 0.2;
      stomach.scale.x = 1 + Math.sin(time * 0.6) * 0.1;

      // Acid movement
      acid.rotation.x += 0.002;
      acid.rotation.y += 0.001;

      // Food particle churn motion
      foodParticles.forEach((particle, idx) => {
        const baseAngle = (idx / foodParticles.length) * Math.PI * 2;
        const radius = 1.2 + Math.sin(time * 0.8 + idx) * 0.3;
        particle.position.x = Math.cos(baseAngle + time * 0.4) * radius;
        particle.position.y = Math.sin(time * 0.5 + idx) * 0.8;
        particle.position.z = Math.sin(baseAngle + time * 0.4) * radius * 0.6;
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return {
      dispose() {
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Apply topic color theme
  const root = document.documentElement;
  const c = window.TOPIC_DATA.color;
  root.style.setProperty('--dom-nav-bg', c.nav);
  root.style.setProperty('--dom-accent', c.accent);
  root.style.setProperty('--dom-accent2', c.accent2);
  root.style.setProperty('--dom-bg', c.bg);
  root.style.setProperty('--dom-bg-card', c.card);
  root.style.setProperty('--dom-border', c.border);

  // Initialize engine
  const story = new ScienceStory({
    gameId: window.TOPIC_DATA.id,
    navTitle: window.TOPIC_DATA.name,
    storageKey: `sci-${window.TOPIC_DATA.id}`,
    topicData: window.TOPIC_DATA
  });
  story.init();
});
