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
    // Better background: dark but not pure black
    scene.background = new THREE.Color(0x0d0d0d);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 11);
    camera.lookAt(0, 0, 0);

    // Sun: Glowing white/yellow light source
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xfcd34d,
        emissiveIntensity: 1,
        metalness: 0.1,
        roughness: 0.2
      })
    );
    sun.position.set(-6.5, 0, 0);
    scene.add(sun);

    // Prism: More visible crystal material
    const prismGeo = new THREE.BoxGeometry(1.3, 2.2, 0.6);
    const prismMat = new THREE.MeshPhongMaterial({
      color: 0xf0f8ff,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      specular: 0xffffff,
      shininess: 100
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    prism.position.x = -1.2;
    scene.add(prism);

    // Rainbow spectrum: Much brighter and more vibrant
    const colors = [
      0xff0000,  // Red
      0xff7700,  // Orange
      0xffff00,  // Yellow
      0x00ff00,  // Green
      0x0099ff,  // Blue
      0x4400ff,  // Indigo
      0xff00ff   // Violet
    ];
    const rays = [];

    colors.forEach((color, i) => {
      const rayGeo = new THREE.CylinderGeometry(0.12, 0.12, 5.5, 16);
      const rayMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.7,
        metalness: 0.1,
        roughness: 0.1
      });
      const ray = new THREE.Mesh(rayGeo, rayMat);

      // Spread rays in fan pattern from prism exit
      const angle = (i - 3) * 0.18;
      ray.position.set(2 + Math.cos(angle) * 2.2, (i - 3) * 0.6, 0);
      ray.rotation.z = angle;
      ray.castShadow = true;
      scene.add(ray);
      rays.push({ mesh: ray, angle, speed: 0.01 + i * 0.002 });
    });

    // White light beam: More visible and glowing
    const beamGeo = new THREE.CylinderGeometry(0.18, 0.18, 4.5, 16);
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
      metalness: 0.1,
      roughness: 0.2
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(-3.8, 0, 0);
    beam.rotation.z = Math.PI / 2;
    scene.add(beam);

    // Enhanced lighting: strong point light + directional
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(-6.5, 0, 5);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(8, 3, 5);
    scene.add(dirLight);

    scene.add(new THREE.AmbientLight(0x444444, 0.8));

    // Animation
    let animId;
    function animate() {
      const timeVal = Date.now() * 0.003;

      // Pulse sun with intense glow
      const sunPulse = 1 + Math.sin(timeVal) * 0.25;
      sun.scale.set(sunPulse, sunPulse, sunPulse);
      sun.material.emissiveIntensity = 1 + Math.sin(timeVal * 1.5) * 0.3;

      // Animate rays with shimmer and glow pulsing
      rays.forEach((ray, i) => {
        ray.mesh.rotation.x += ray.speed * 0.5;
        // Rainbow rays glow pulse
        ray.mesh.material.emissiveIntensity = 0.7 + Math.sin(timeVal + i * 0.5) * 0.3;
      });

      // Rotate prism for shimmer with slight scale pulse
      prism.rotation.y += 0.002;
      const prismScale = 1 + Math.sin(timeVal * 0.5) * 0.05;
      prism.scale.set(prismScale, prismScale, prismScale);

      // Beam pulsing
      beam.material.emissiveIntensity = 0.5 + Math.sin(timeVal * 0.8) * 0.2;

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
