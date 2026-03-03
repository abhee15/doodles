/* eslint-disable no-undef */

/**
 * Register 3D scene handler for volcano magma chamber
 */
window.SCENE_3D = {
  'volcano-3d-magma': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2d1b00);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // Crust layer (brown)
    const crustGeo = new THREE.BoxGeometry(10, 2, 6);
    const crustMat = new THREE.MeshLambertMaterial({ color: 0x92400e });
    const crust = new THREE.Mesh(crustGeo, crustMat);
    crust.position.y = 2.5;
    scene.add(crust);

    // Magma chamber (red/orange ellipsoid)
    const magmaChamber = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 24),
      new THREE.MeshLambertMaterial({ color: 0xdc2626, emissive: 0x7f1313 })
    );
    magmaChamber.scale.set(1.2, 1, 1.2);
    magmaChamber.position.y = -1.5;
    scene.add(magmaChamber);

    // Pressure arrows (red lines pointing outward)
    const arrowMat = new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 });
    const directions = [
      [0, 1, 0],
      [-1, 0, 0],
      [1, 0, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1]
    ];

    directions.forEach(dir => {
      const arrowGeo = new THREE.BufferGeometry();
      arrowGeo.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          [0, -1.5, 0, dir[0] * 1.5, -1.5 + dir[1] * 1.5, dir[2] * 1.5],
          3
        )
      );
      const arrow = new THREE.Line(arrowGeo, arrowMat);
      scene.add(arrow);
    });

    // Hot inner core (bright red sphere)
    const coreGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff4444 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = -1.5;
    scene.add(core);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(5, 3, 5);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0x663300, 0.6));

    // Animation
    let animId;
    function animate() {
      // Magma chamber pulsing
      magmaChamber.scale.set(
        1.2 + Math.sin(Date.now() * 0.003) * 0.15,
        1 + Math.sin(Date.now() * 0.003) * 0.1,
        1.2 + Math.sin(Date.now() * 0.003) * 0.15
      );

      core.scale.set(
        1 + Math.sin(Date.now() * 0.002) * 0.2,
        1 + Math.sin(Date.now() * 0.002) * 0.2,
        1 + Math.sin(Date.now() * 0.002) * 0.2
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
