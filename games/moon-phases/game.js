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
    scene.background = new THREE.Color(0x05091a);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 7, 14);
    camera.lookAt(0, 0, 0);

    // Stars (400 small points)
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

    // Earth
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 32, 32),
      new THREE.MeshLambertMaterial({ color: 0x2266cc })
    );
    scene.add(earth);

    // Moon
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshLambertMaterial({ color: 0xbbbbbb })
    );
    scene.add(moon);

    // Sunlight (directional, from far right)
    const sunLight = new THREE.DirectionalLight(0xffffee, 2.5);
    sunLight.position.set(20, 2, 0);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x112244, 0.35));

    // Animate: moon orbits Earth every ~13s
    let angle = 0;
    let animId;
    function animate() {
      angle += 0.007;
      moon.position.x = Math.cos(angle) * 4.5;
      moon.position.z = Math.sin(angle) * 4.5;
      earth.rotation.y += 0.003;
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
