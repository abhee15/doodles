/* eslint-disable no-undef */

/**
 * Register 3D scene handler for seasons
 */
window.SCENE_3D = {
  'seasons-3d-tilt': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Better background: deeper space blue
    scene.background = new THREE.Color(0x0d1220);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(3, 4, 11);
    camera.lookAt(0, 0, 0);

    // Enhanced stars
    const starVerts = [];
    for (let i = 0; i < 400; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 })));

    // Sun: Glowing and vibrant
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfcd34d,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.9,
        metalness: 0.1,
        roughness: 0.2
      })
    );
    sun.position.set(-7, 0, 0);
    scene.add(sun);

    // Orbit ellipse: Brighter and more visible
    const orbitCurve = new THREE.EllipseCurve(0, 0, 7, 5, 0, Math.PI * 2, false, 0);
    const orbitPoints = orbitCurve.getPoints(120);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x6b7280, linewidth: 1.5 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = Math.PI / 2.5;
    scene.add(orbitLine);

    // Earth: Brighter with glow
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        metalness: 0.2,
        roughness: 0.4,
        emissive: 0x16a34a,
        emissiveIntensity: 0.15
      })
    );
    earth.rotation.z = (23.5 * Math.PI) / 180; // Axial tilt
    scene.add(earth);

    // Axis line: Brighter red for better visibility
    const axisGeo = new THREE.BufferGeometry();
    axisGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, -1.2, 0, 0, 1.2, 0], 3));
    const axisMat = new THREE.LineBasicMaterial({ color: 0xff6b6b, linewidth: 2 });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    axisLine.rotation.z = (23.5 * Math.PI) / 180;
    scene.add(axisLine);

    // Enhanced lighting: strong sun + fill light
    const sunLight = new THREE.DirectionalLight(0xffffee, 2.5);
    sunLight.position.set(-7, 2, 2);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x4f46e5, 1.2);
    fillLight.position.set(8, -2, -2);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0x4f46e5, 0.8));

    // Animation
    let angle = 0;
    let animId;
    function animate() {
      angle += 0.002;
      const timeVal = Date.now() * 0.002;

      // Earth orbits (stays tilted)
      const orbitRadius = 7;
      earth.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius * 0.7);
      axisLine.position.copy(earth.position);

      // Sun pulsing glow
      const pulse = 1 + Math.sin(timeVal) * 0.1;
      sun.scale.set(pulse, pulse, pulse);
      sun.material.emissiveIntensity = 0.9 + Math.sin(timeVal * 1.5) * 0.25;

      // Earth subtle glow
      earth.material.emissiveIntensity = 0.15 + Math.sin(timeVal * 0.8) * 0.08;

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
