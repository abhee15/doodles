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
    // Better background: subtle gradient from dark blue to teal
    scene.background = new THREE.Color(0x001a3d);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Sun (glowing yellow sphere with emissive properties)
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfcd34d,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.8,
        metalness: 0.2,
        roughness: 0.3
      })
    );
    sun.position.set(-8, 3, -5);
    scene.add(sun);

    // Light rays (8 cones from sun - more vibrant)
    const rayMaterial = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.5
    });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ray = new THREE.Mesh(new THREE.ConeGeometry(0.35, 8, 8), rayMaterial);
      ray.position.set(-8 + Math.cos(angle) * 6, 3 + Math.sin(angle) * 3, -5 + Math.cos(angle) * 4);
      ray.lookAt(0, 0, 0);
      scene.add(ray);
    }

    // Soil/Plant base (brown sphere)
    const soil = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x8b6914,
        metalness: 0.1,
        roughness: 0.6,
        emissive: 0x4d3d0a,
        emissiveIntensity: 0.1
      })
    );
    scene.add(soil);

    // Leaf (bright vibrant green)
    const leafGeo = new THREE.PlaneGeometry(2.2, 1.4);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      side: THREE.DoubleSide,
      metalness: 0.2,
      roughness: 0.4,
      emissive: 0x16a34a,
      emissiveIntensity: 0.2
    });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(2, 0.2, 0);
    leaf.rotation.y = Math.PI / 6;
    scene.add(leaf);

    // Enhanced lighting: strong directional + fill lights
    const mainLight = new THREE.DirectionalLight(0xffffee, 2.5);
    mainLight.position.set(-8, 4, -5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x22c55e, 1.2);
    fillLight.position.set(8, -2, 5);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0x2d5a3d, 0.9));

    // Animate sun pulsing, leaf rotation, and glow effects
    let time = 0;
    let animId;
    function animate() {
      time += 0.01;
      const pulse = Math.sin(time) * 0.15;
      sun.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      // Dynamic sun glow
      sun.material.emissiveIntensity = 0.8 + Math.sin(time * 1.5) * 0.3;

      // Leaf rotation and gentle bob
      leaf.rotation.z += 0.002;
      leaf.position.y = 0.2 + Math.sin(time * 0.5) * 0.15;

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
