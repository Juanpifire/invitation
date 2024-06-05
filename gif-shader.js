AFRAME.registerShader('gif', {
  schema: {
    src: {type: 'map', is: 'uniform'}
  },
  raw: true,
  fragmentShader: `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform sampler2D src;

    varying vec2 vUV;

    void main() {
      vec4 color = texture2D(src, vUV);
      gl_FragColor = color;
    }
  `,
  init: function (data) {
    var texture = new THREE.TextureLoader().load(data.src);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        src: {type: 't', value: texture}
      },
      vertexShader: THREE.ShaderLib.basic.vertexShader,
      fragmentShader: this.fragmentShader,
      side: THREE.DoubleSide
    });
  }
});
