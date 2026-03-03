/**
 * Photosynthesis Explorer — Game Init
 */
/* eslint-disable no-undef */

/**
 * Register 3D scene handler for photosynthesis
 */
window.SCENE_3D = {
  'photosynthesis-3d-sun': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001428);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    // Sun (yellow sphere, pulsing)
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    sun.position.set(-8, 3, -5);
    scene.add(sun);

    // Light rays (8 cones from sun toward center)
    const rayMaterial = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.4
    });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ray = new THREE.Mesh(new THREE.ConeGeometry(0.3, 8, 8), rayMaterial);
      ray.position.set(-8 + Math.cos(angle) * 6, 3 + Math.sin(angle) * 3, -5 + Math.cos(angle) * 4);
      ray.lookAt(0, 0, 0);
      scene.add(ray);
    }

    // Earth (green sphere at center)
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshLambertMaterial({ color: 0x22c55e })
    );
    scene.add(earth);

    // Leaf (green flat plane)
    const leafGeo = new THREE.PlaneGeometry(2, 1.2);
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x4ade80, side: THREE.DoubleSide });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(2, 0, 0);
    leaf.rotation.y = Math.PI / 6;
    scene.add(leaf);

    // Lighting
    const mainLight = new THREE.DirectionalLight(0xffffee, 1.5);
    mainLight.position.set(-8, 3, -5);
    scene.add(mainLight);
    scene.add(new THREE.AmbientLight(0x1a4d2e, 0.8));

    // Animate sun pulsing and leaf rotation
    let time = 0;
    let animId;
    function animate() {
      time += 0.01;
      sun.scale.set(
        1 + Math.sin(time) * 0.15,
        1 + Math.sin(time) * 0.15,
        1 + Math.sin(time) * 0.15
      );
      leaf.rotation.z += 0.002;
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
