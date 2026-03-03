/* eslint-disable no-undef */

/**
 * Register 3D scene handler for earthquake tectonic plates
 */
window.SCENE_3D = {
  'earthquake-3d-plates': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x5a3a2a);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    // Left tectonic plate
    const plate1 = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.8, 5),
      new THREE.MeshLambertMaterial({ color: 0x92400e })
    );
    plate1.position.x = -2.5;
    scene.add(plate1);

    // Right tectonic plate
    const plate2 = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.8, 5),
      new THREE.MeshLambertMaterial({ color: 0xa0600e })
    );
    plate2.position.x = 2.5;
    scene.add(plate2);

    // Fault line / stress zone (red middle plane)
    const faultGeo = new THREE.PlaneGeometry(0.5, 5);
    const faultMat = new THREE.MeshLambertMaterial({
      color: 0xb91c1c,
      side: THREE.DoubleSide,
      emissive: 0x7f1c1c
    });
    const fault = new THREE.Mesh(faultGeo, faultMat);
    fault.position.z = 0.1;
    scene.add(fault);

    // Stress wave indicator (pulsing cube at fault)
    const stressGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const stressMat = new THREE.MeshBasicMaterial({ color: 0xff4444 });
    const stress = new THREE.Mesh(stressGeo, stressMat);
    stress.position.z = 0.2;
    scene.add(stress);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(4, 4, 4);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0x663300, 0.7));

    // Animation
    let animId;
    let offset = 0;
    function animate() {
      offset += 0.01;
      // Plates sliding (left goes left, right goes right)
      plate1.position.x = -2.5 - Math.sin(offset) * 0.3;
      plate2.position.x = 2.5 + Math.sin(offset) * 0.3;

      // Stress pulse
      stress.scale.set(
        1 + Math.sin(Date.now() * 0.005) * 0.4,
        1 + Math.sin(Date.now() * 0.005) * 0.4,
        1 + Math.sin(Date.now() * 0.005) * 0.4
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
