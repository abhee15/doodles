/**
 * Rainbow Science — Game Init
 */
/* eslint-disable no-undef */

/**
 * Register 3D scene handler for rainbow spectrum
 */
window.SCENE_3D = {
  'rainbow-3d-spectrum': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // Sun (white glowing sphere)
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    sun.position.set(-6, 0, 0);
    scene.add(sun);

    // Prism (transparent white box with rainbow refraction)
    const prismGeo = new THREE.BoxGeometry(1.2, 2, 0.5);
    const prismMat = new THREE.MeshPhongMaterial({
      color: 0xf0f8ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    prism.position.x = -1.5;
    scene.add(prism);

    // Rainbow spectrum (7 colored cylinders)
    const colors = [0xff0000, 0xff7700, 0xffff00, 0x00ff00, 0x0088ff, 0x4400ff, 0xff00ff];
    const colorNames = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
    const rays = [];

    colors.forEach((color, i) => {
      const rayGeo = new THREE.CylinderGeometry(0.08, 0.08, 5, 16);
      const rayMat = new THREE.MeshBasicMaterial({ color });
      const ray = new THREE.Mesh(rayGeo, rayMat);

      // Spread rays in fan pattern from prism exit
      const angle = (i - 3) * 0.15; // -45° to +45°
      ray.position.set(1.5 + Math.cos(angle) * 2, (i - 3) * 0.5, 0);
      ray.rotation.z = angle;
      ray.castShadow = true;
      scene.add(ray);
      rays.push({ mesh: ray, angle, speed: 0.01 + i * 0.002 });
    });

    // White light beam (before prism)
    const beamGeo = new THREE.CylinderGeometry(0.15, 0.15, 4, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(-3.5, 0, 0);
    beam.rotation.z = Math.PI / 2;
    scene.add(beam);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x333333, 0.5));

    // Animation
    let animId;
    function animate() {
      // Pulse sun
      sun.scale.set(
        1 + Math.sin(Date.now() * 0.003) * 0.2,
        1 + Math.sin(Date.now() * 0.003) * 0.2,
        1 + Math.sin(Date.now() * 0.003) * 0.2
      );

      // Rotate rays slightly for shimmer effect
      rays.forEach((ray, i) => {
        ray.mesh.rotation.x += ray.speed * 0.5;
      });

      // Rotate prism for shimmer
      prism.rotation.y += 0.002;

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
