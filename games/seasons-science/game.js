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
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Stars
    const starVerts = [];
    for (let i = 0; i < 300; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })));

    // Sun
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    sun.position.set(-7, 0, 0);
    scene.add(sun);

    // Orbit ellipse (visual guide)
    const orbitCurve = new THREE.EllipseCurve(0, 0, 7, 5, 0, Math.PI * 2, false, 0);
    const orbitPoints = orbitCurve.getPoints(100);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x444444 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = Math.PI / 2.5;
    scene.add(orbitLine);

    // Earth (tilted axis)
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 64, 64),
      new THREE.MeshLambertMaterial({ color: 0x22c55e })
    );
    earth.rotation.z = (23.5 * Math.PI) / 180; // Axial tilt
    scene.add(earth);

    // Axis line (red)
    const axisGeo = new THREE.BufferGeometry();
    axisGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, -1.2, 0, 0, 1.2, 0], 3));
    const axisMat = new THREE.LineBasicMaterial({ color: 0xff6b6b, linewidth: 2 });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    axisLine.rotation.z = (23.5 * Math.PI) / 180;
    scene.add(axisLine);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffee, 1.8);
    sunLight.position.set(-7, 0, 0);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x1a1a2e, 0.6));

    // Animation
    let angle = 0;
    let animId;
    function animate() {
      angle += 0.002;
      // Earth orbits (stays tilted)
      const orbitRadius = 7;
      earth.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius * 0.7);
      axisLine.position.copy(earth.position);
      sun.scale.set(
        1 + Math.sin(Date.now() * 0.002) * 0.08,
        1 + Math.sin(Date.now() * 0.002) * 0.08,
        1 + Math.sin(Date.now() * 0.002) * 0.08
      );
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
