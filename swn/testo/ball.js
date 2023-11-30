import * as th from 'three';

export class Ball extends th.Mesh {
	constructor() {
		super()
		this.geometry = new th.SphereGeometry()
		this.material = new th.MeshPhongMaterial({color: 0x897abc})
		this.size = 10
		this.ballActive = false;
		this.color = 0xff33ec

	}

	onMouseOver(e) { this.material.color.set(0xffffff); }

	onMouseOut(e) { this.material.color.set(this.color) }

	// onClick(e) {
	// 	this.ballActive = !this.ballActive;
	// 	controls.target.set(this.position.x, this.position.y, this.position.z);
	// 	camera.position.set(this.position.x + 15, this.position.y + 20, this.position.z - 10);
  	// 	controls.update();
	// }
}