/**
 * Day & Night — Game Init
 */
/* eslint-disable no-undef */

/**
 * Register 3D scene handler for day-and-night
 */
window.SCENE_3D = {
  'day-and-night-3d': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    // Stars background
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
    sun.position.set(-5, 0, 0);
    scene.add(sun);

    // Earth (rotating)
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshLambertMaterial({ color: 0x22c55e })
    );
    scene.add(earth);

    // Dark side hemisphere
    const darkGeo = new THREE.SphereGeometry(1.01, 64, 64);
    const darkMat = new THREE.MeshLambertMaterial({ color: 0x1f2937, emissive: 0x111111 });
    const darkSide = new THREE.Mesh(darkGeo, darkMat);
    darkSide.rotation.x = Math.PI / 2.5;
    scene.add(darkSide);

    // Lighting from sun
    const sunLight = new THREE.DirectionalLight(0xffffee, 2);
    sunLight.position.set(-5, 0, 0);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x1a1a2e, 0.6));

    // Animation
    let animId;
    function animate() {
      earth.rotation.y += 0.002;
      darkSide.rotation.y += 0.002;
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
