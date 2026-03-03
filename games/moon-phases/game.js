/**
 * Moon Phases — Game Init
 */
/* eslint-disable no-undef */

/**
 * Register 3D scene handler for moon-phases-3d
 */
window.SCENE_3D = {
  'moon-phases-3d': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Better background: dark space with gradient feel
    scene.background = new THREE.Color(0x0a0e27);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 6, 12);
    camera.lookAt(0, 0, 0);

    // Enhanced stars background
    const starVerts = [];
    for (let i = 0; i < 500; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 })));

    // Earth: Brighter, more vibrant blue
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x1e90ff,
        metalness: 0.3,
        roughness: 0.4,
        emissive: 0x0047ab,
        emissiveIntensity: 0.2
      })
    );
    scene.add(earth);

    // Moon: Brighter, more visible white/gray
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xd0d0d0,
        metalness: 0.1,
        roughness: 0.5,
        emissive: 0x808080,
        emissiveIntensity: 0.15
      })
    );
    scene.add(moon);

    // Enhanced lighting: directional + multiple lights
    const sunLight = new THREE.DirectionalLight(0xffffee, 3);
    sunLight.position.set(20, 5, 5);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x6699ff, 1.5);
    fillLight.position.set(-15, -5, -5);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0x4488dd, 0.6));

    // Animate: moon orbits Earth every ~13s with enhanced effects
    let angle = 0;
    let animId;
    function animate() {
      angle += 0.007;
      moon.position.x = Math.cos(angle) * 4.5;
      moon.position.z = Math.sin(angle) * 4.5;
      earth.rotation.y += 0.003;

      // Subtle pulsing glow on Earth
      earth.material.emissiveIntensity = 0.2 + Math.sin(Date.now() * 0.002) * 0.1;

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
  const root = document.documentElement;
  const c = window.TOPIC_DATA.color;
  root.style.setProperty('--dom-nav-bg', c.nav);
  root.style.setProperty('--dom-accent', c.accent);
  root.style.setProperty('--dom-accent2', c.accent2);
  root.style.setProperty('--dom-bg', c.bg);
  root.style.setProperty('--dom-bg-card', c.card);
  root.style.setProperty('--dom-border', c.border);

  const story = new ScienceStory({
    gameId: window.TOPIC_DATA.id,
    navTitle: window.TOPIC_DATA.name,
    storageKey: `sci-${window.TOPIC_DATA.id}`,
    topicData: window.TOPIC_DATA
  });
  story.init();
});
