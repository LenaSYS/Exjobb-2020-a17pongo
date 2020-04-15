clay.application.create('#claymap', {

    width: window.innerWidth,
    height: window.innerHeight,

    init(app) {
      // Create camera
      this._camera = app.createCamera([0, 2, 5], [0, 0, 0]);

      // Create a RED cube
      this._cube = app.createCube({
          color: '#f00'
      });

      // Create light
      this._mainLight = app.createDirectionalLight([-1, -1, -1]);
    },
    loop(app) {
      this._cube.rotation.rotateY(app.frameTime / 1000);
    }
  });