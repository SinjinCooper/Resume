// Class for making celestial bodies.
import * as th from 'three';

// Spherical body, i.e. planets, moons
export class Body {
    constructor(name, size, dist, face) {
        this.name = name;
        this.size = size;
        this.positionX = dist;
        this.face = face;
    }

    getMesh() {
        if (this.mesh === undefined || this.mesh === null) {
            const geometry = new th.SphereGeometry(this.size);
            //const texture = new th.TextureLoader().load(this.textureFile);
            const material = new th.MeshBasicMaterial({ color: 0xffffff, map: this.face });
            this.mesh = new th.Mesh(geometry, material);
            this.mesh.position.x += this.positionX;
        }
        return this.mesh;
    }
}

// export default class Planet {
//   constructor(radius, positionX, textureFile) {
//     this.radius = radius;
//     this.positionX = positionX;
//     this.textureFile = textureFile;
//   }

//   getMesh() {
//     if (this.mesh === undefined || this.mesh === null) {
//       const geometry = new THREE.SphereGeometry(this.radius);
//       const texture = new THREE.TextureLoader().load(this.textureFile);
//       const material = new THREE.MeshBasicMaterial({ map: texture });
//       this.mesh = new THREE.Mesh(geometry, material);
//       this.mesh.position.x += this.positionX;
//     }
//     return this.mesh;
//   }
// }