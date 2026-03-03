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
    // Better background: reddish-brown for volcanic theme
    scene.background = new THREE.Color(0x3d2416);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);
    camera.lookAt(0, 0, 0);

    // Crust layer: Brighter brown with texture feel
    const crustGeo = new THREE.BoxGeometry(11, 2.2, 6.5);
    const crustMat = new THREE.MeshStandardMaterial({
      color: 0xa0631d,
      metalness: 0.2,
      roughness: 0.6,
      emissive: 0x6d4221,
      emissiveIntensity: 0.1
    });
    const crust = new THREE.Mesh(crustGeo, crustMat);
    crust.position.y = 2.5;
    scene.add(crust);

    // Magma chamber: Glowing red with strong emissive
    const magmaChamber = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 24),
      new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xdc2626,
        emissiveIntensity: 0.8,
        metalness: 0.1,
        roughness: 0.3
      })
    );
    magmaChamber.scale.set(1.2, 1, 1.2);
    magmaChamber.position.y = -1.5;
    scene.add(magmaChamber);

    // Pressure arrows: Brighter orange for visibility
    const arrowMat = new THREE.LineBasicMaterial({ color: 0xffa500, linewidth: 2.5 });
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
          [0, -1.5, 0, dir[0] * 1.6, -1.5 + dir[1] * 1.6, dir[2] * 1.6],
          3
        )
      );
      const arrow = new THREE.Line(arrowGeo, arrowMat);
      scene.add(arrow);
    });

    // Hot inner core: Very bright glowing orange/red
    const coreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      emissive: 0xff4444,
      emissiveIntensity: 1,
      metalness: 0.2,
      roughness: 0.2
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = -1.5;
    scene.add(core);

    // Enhanced lighting: warm volcanic lighting
    const light1 = new THREE.DirectionalLight(0xffccaa, 1.2);
    light1.position.set(6, 4, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xff6b35, 1);
    light2.position.set(-8, -2, -3);
    scene.add(light2);

    scene.add(new THREE.AmbientLight(0x8b4513, 0.8));

    // Animation
    let animId;
    function animate() {
      const timeVal = Date.now() * 0.003;

      // Magma chamber pulsing with glow
      magmaChamber.scale.set(
        1.2 + Math.sin(timeVal) * 0.18,
        1 + Math.sin(timeVal) * 0.12,
        1.2 + Math.sin(timeVal) * 0.18
      );
      magmaChamber.material.emissiveIntensity = 0.8 + Math.sin(timeVal * 1.5) * 0.3;

      // Core pulsing intensely with max glow
      const corePulse = 1 + Math.sin(Date.now() * 0.002) * 0.25;
      core.scale.set(corePulse, corePulse, corePulse);
      core.material.emissiveIntensity = 0.9 + Math.sin(Date.now() * 0.003) * 0.4;

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
