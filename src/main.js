// Moving train and wheels
import * as THREE from 'three';

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101020); // 어두운 밤하늘 느낌
document.body.appendChild(renderer.domElement);

// 전체 ambient light를 어둡게
const ambientLight = new THREE.AmbientLight(0x444466, 0.12);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xccccff, 0.7); // 달빛 느낌
directionalLight.position.set(1, 2, 1)
scene.add(directionalLight);

camera.position.set(0, 1, 4);

//Setup groups
const trainGroup = new THREE.Group();
const frontWheelGroup = new THREE.Group();
const centerWheelGroup = new THREE.Group();
const rearWheelGroup = new THREE.Group();
scene.add(trainGroup);
trainGroup.add(frontWheelGroup);
trainGroup.add(centerWheelGroup);
trainGroup.add(rearWheelGroup);

//Setup the body of train
const rotationAngle = Math.PI / 2;
const boxGeometry = new THREE.BoxGeometry(1, 1.5, 1);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 20 });

// Adjust shininess
const box = new THREE.Mesh(boxGeometry, boxMaterial);
trainGroup.add(box);

const box2Geometry = new THREE.BoxGeometry(1, 0.1, 3);
const box2Material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 80 });
const box2 = new THREE.Mesh(box2Geometry, box2Material);
trainGroup.add(box2);
box2.position.set(0, -0.6, -0.7);


const box3Geometry = new THREE.BoxGeometry(1, 0.1, 3);
const box3Material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 80 });
const box3 = new THREE.Mesh(box3Geometry, box3Material);
trainGroup.add(box3);
box3.position.set(0, -0.7, -0.8);


const coneGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.6);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x101010, shininess: 80 });

// Adjust shininess
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(0, 0.3, -1.5);
cone.rotation.set(Math.PI, 0, 0)
trainGroup.add(cone);

const cylindergeometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 80 });
const cylinder = new THREE.Mesh(cylindergeometry, cylinderMaterial);
cylinder.rotation.set(Math.PI / 2, 0, 0);
cylinder.position.set(0, -0.25, -1)
trainGroup.add(cylinder);

const geometry = new THREE.SphereGeometry(0.3, 32, 16, 0, 3.14, 0, 1.57);
const material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0.3, -0.5);
trainGroup.add(sphere);

//Setup the Wheels of train
const wheelGeometry = new THREE.TorusGeometry(0.15, 0.08, 7, 11);
const bigwheel = new THREE.TorusGeometry(0.3, 0.15, 7, 11);
const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, reflectivity: 0, shininess: 30 });

//Front Wheels
const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
frontWheelGroup.add(wheel1);
frontWheelGroup.add(wheel2);
frontWheelGroup.position.set(0, -0.5, -1.8);
wheel1.position.set(-0.55, -0.1, 0);
wheel2.position.set(0.55, -0.1, 0);
wheel1.rotation.y += rotationAngle;
wheel2.rotation.y += rotationAngle;

//Center Wheels
const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
centerWheelGroup.add(wheel3);
centerWheelGroup.add(wheel4);
centerWheelGroup.position.set(0, -0.5, -1.3);
wheel3.position.set(-0.55, -0.1, 0);
wheel4.position.set(0.55, -0.1, 0);
wheel3.rotation.y += rotationAngle;
wheel4.rotation.y += rotationAngle;

//Rear Wheels
const wheel5 = new THREE.Mesh(bigwheel, wheelMaterial);
const wheel6 = new THREE.Mesh(bigwheel, wheelMaterial);
rearWheelGroup.add(wheel5);
rearWheelGroup.add(wheel6);
rearWheelGroup.position.set(0, -0.5, 0.1);
wheel5.position.set(-0.55, 0, 0);
wheel6.position.set(0.55, 0, 0);
wheel5.rotation.y += rotationAngle;
wheel6.rotation.y += rotationAngle;

trainGroup.position.set(0, 4, -20);
// Scale trainGroup 3x
trainGroup.scale.set(5, 5, 5);
// Rotate train 180 degrees around y-axis
trainGroup.rotation.y = Math.PI;
// Camera looks at train
camera.lookAt(trainGroup.position);

// 잔디색 바닥 Plane 추가 (50x50)
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 }); // 잔디색
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// 집 생성 함수
function createHouse(x, y, z, scale = 1, roofColor = 0x8b0000) {
    const houseGroup = new THREE.Group();
    // 본체
    const bodyGeometry = new THREE.BoxGeometry(3, 2, 3);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xdeb887 }); // 밝은 갈색
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1; // 바닥 위에 놓이도록
    houseGroup.add(body);
    // 지붕
    const roofGeometry = new THREE.ConeGeometry(2.2, 1.5, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: roofColor });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.7;
    roof.rotation.y = Math.PI / 4; // 사각형에 맞게 회전
    houseGroup.add(roof);
    // 스케일 적용
    houseGroup.scale.set(scale, scale, scale);
    // 위치 지정
    houseGroup.position.set(x, y, z);
    scene.add(houseGroup);
}

// 기차 기준 양옆에 집 두 개 생성 (두번째 집만 지붕색 다르게)
createHouse(-7, 0, -3, 1); // 기본 스케일, 기본 지붕색
createHouse(6.8, 0, -3, 1, 0x00008b); // 기본 스케일, 파란 지붕

// --- 기차 얼굴 추가 ---
function createTrainFace2() {
    const faceGroup = new THREE.Group();
    // 얼굴(구)
    const faceGeometry = new THREE.SphereGeometry(0.50, 32, 32);
    const faceMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 80, specular: 0xffffff });
    const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
    faceMesh.position.set(0, 0.45, 1);
    faceGroup.add(faceMesh);

    // 코(작은 구)
    const noseGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc, shininess: 100 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0.4, 1.5);
    faceGroup.add(nose);

    // 왼쪽 눈(흰색 구)
    const eyeWhiteGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeWhiteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    leftEyeWhite.position.set(-0.2, 0.53, 1.5);
    faceGroup.add(leftEyeWhite);
    // 왼쪽 눈(검은색 동공)
    const leftEyeBlackGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const leftEyeBlackMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftEyeBlack = new THREE.Mesh(leftEyeBlackGeometry, leftEyeBlackMaterial);
    leftEyeBlack.position.set(-0.19, 0.5, 1.58);
    faceGroup.add(leftEyeBlack);
    // 왼쪽 눈 안광(작은 흰색 구)
    const leftEyeShineGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const leftEyeShineMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const leftEyeShine = new THREE.Mesh(leftEyeShineGeometry, leftEyeShineMaterial);
    leftEyeShine.position.set(-0.21, 0.52, 1.6);
    faceGroup.add(leftEyeShine);

    // 오른쪽 눈(흰색 구)
    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    rightEyeWhite.position.set(0.2, 0.53, 1.5);
    faceGroup.add(rightEyeWhite);
    // 오른쪽 눈(검은색 동공)
    const rightEyeBlack = new THREE.Mesh(leftEyeBlackGeometry, leftEyeBlackMaterial);
    rightEyeBlack.position.set(0.19, 0.5, 1.58);
    faceGroup.add(rightEyeBlack);
    // 오른쪽 눈 안광(작은 흰색 구)
    const rightEyeShine = new THREE.Mesh(leftEyeShineGeometry, leftEyeShineMaterial);
    rightEyeShine.position.set(0.16, 0.52, 1.6);
    faceGroup.add(rightEyeShine);

    // 왼쪽 눈썹(평면 삼각형)
    const leftBrowShape = new THREE.Shape();
    leftBrowShape.moveTo(-0.16, 0.70);
    leftBrowShape.lineTo(-0.02, 0.70);
    leftBrowShape.lineTo(-0.09, 0.74);
    leftBrowShape.lineTo(-0.16, 0.70);
    const leftBrowGeometry = new THREE.ShapeGeometry(leftBrowShape);
    const browMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const leftBrow = new THREE.Mesh(leftBrowGeometry, browMaterial);
    leftBrow.position.x = -0.1;
    leftBrow.position.z = 1.41;
    faceGroup.add(leftBrow);
    // 오른쪽 눈썹(평면 삼각형)
    const rightBrowShape = new THREE.Shape();
    rightBrowShape.moveTo(0.16, 0.70);
    rightBrowShape.lineTo(0.02, 0.70);
    rightBrowShape.lineTo(0.09, 0.74);
    rightBrowShape.lineTo(0.16, 0.70);
    const rightBrowGeometry = new THREE.ShapeGeometry(rightBrowShape);
    const rightBrow = new THREE.Mesh(rightBrowGeometry, browMaterial);
    rightBrow.position.x = 0.1;
    rightBrow.position.z = 1.41; // z축을 더 앞으로 조정
    faceGroup.add(rightBrow);

    // 입(입체 곡선, 얇은 원기둥 여러 개로 근사)
    const mouthCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.1, 0.25, 1.5),
        new THREE.Vector3(0, 0.15, 1.5),
        new THREE.Vector3(0.1, 0.25, 1.5)
    );
    const mouthPoints = mouthCurve.getPoints(12);
    for (let i = 0; i < mouthPoints.length - 1; i++) {
        const segGeom = new THREE.CylinderGeometry(0.008, 0.008, mouthPoints[i].distanceTo(mouthPoints[i + 1]), 8);
        const seg = new THREE.Mesh(segGeom, browMaterial);
        seg.position.set(
            (mouthPoints[i].x + mouthPoints[i + 1].x) / 2,
            (mouthPoints[i].y + mouthPoints[i + 1].y) / 2,
            (mouthPoints[i].z + mouthPoints[i + 1].z) / 2
        );
        seg.lookAt(mouthPoints[i + 1]);
        seg.rotateX(Math.PI / 2);
        faceGroup.add(seg);
    }

    // 왼쪽 광대 곡선
    const cheekMaterial = new THREE.MeshPhongMaterial({ color: 0xbbbbbb, shininess: 80 }); // 회색
    const leftCheekCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.30, 0.30, 1.5),
        new THREE.Vector3(-0.20, 0.25, 1.5),
        new THREE.Vector3(-0.10, 0.35, 1.5)
    );
    const leftCheekPoints = leftCheekCurve.getPoints(12);
    for (let i = 0; i < leftCheekPoints.length - 1; i++) {
        const segGeom = new THREE.CylinderGeometry(0.004, 0.004, leftCheekPoints[i].distanceTo(leftCheekPoints[i + 1]), 8); // 더 얇게
        const seg = new THREE.Mesh(segGeom, cheekMaterial);
        seg.position.set(
            (leftCheekPoints[i].x + leftCheekPoints[i + 1].x) / 2,
            (leftCheekPoints[i].y + leftCheekPoints[i + 1].y) / 2,
            (leftCheekPoints[i].z + leftCheekPoints[i + 1].z) / 2
        );
        seg.lookAt(leftCheekPoints[i + 1]);
        seg.rotateX(Math.PI / 2);
        faceGroup.add(seg);
    }

    // 오른쪽 광대 곡선
    const rightCheekCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0.30, 0.30, 1.5),
        new THREE.Vector3(0.20, 0.25, 1.5),
        new THREE.Vector3(0.10, 0.35, 1.5)
    );
    const rightCheekPoints = rightCheekCurve.getPoints(12);
    for (let i = 0; i < rightCheekPoints.length - 1; i++) {
        const segGeom = new THREE.CylinderGeometry(0.004, 0.004, rightCheekPoints[i].distanceTo(rightCheekPoints[i + 1]), 8); // 더 얇게
        const seg = new THREE.Mesh(segGeom, cheekMaterial);
        seg.position.set(
            (rightCheekPoints[i].x + rightCheekPoints[i + 1].x) / 2,
            (rightCheekPoints[i].y + rightCheekPoints[i + 1].y) / 2,
            (rightCheekPoints[i].z + rightCheekPoints[i + 1].z) / 2
        );
        seg.lookAt(rightCheekPoints[i + 1]);
        seg.rotateX(Math.PI / 2);
        faceGroup.add(seg);
    }

    faceGroup.position.set(0, -0.7, -1);
    faceGroup.rotation.y = Math.PI;
    return faceGroup;
}

// 표정 1(잠자는 얼굴) 눈 감고, 입은 o
function createTrainFace1() {
    const faceGroup = new THREE.Group();
    // 얼굴(구)
    const faceGeometry = new THREE.SphereGeometry(0.50, 32, 32);
    const faceMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 80, specular: 0xffffff });
    const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
    faceMesh.position.set(0, 0.45, 1);
    faceGroup.add(faceMesh);

    // 코(작은 구)
    const noseGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc, shininess: 100 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0.4, 1.5);
    faceGroup.add(nose);

    // 왼쪽 눈(감은 눈: 얇은 원기둥)
    const eyeMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const leftEyeClosed = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.012, 16), eyeMat);
    leftEyeClosed.position.set(-0.2, 0.53, 1.5);
    faceGroup.add(leftEyeClosed);

    // 오른쪽 눈(감은 눈: 얇은 원기둥)
    const rightEyeClosed = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.012, 16), eyeMat);
    rightEyeClosed.position.set(0.2, 0.53, 1.5);
    faceGroup.add(rightEyeClosed);

    // 입(o 모양: 도넛)
    const mouthO = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 16, 32), new THREE.MeshPhongMaterial({ color: 0x222222 }));
    mouthO.position.set(0, 0.22, 1.5);
    faceGroup.add(mouthO);

    // 광대(동일)
    const cheekMaterial = new THREE.MeshPhongMaterial({ color: 0xbbbbbb, shininess: 80 });
    const leftCheekCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.30, 0.30, 1.5),
        new THREE.Vector3(-0.20, 0.25, 1.5),
        new THREE.Vector3(-0.10, 0.35, 1.5)
    );
    const leftCheekPoints = leftCheekCurve.getPoints(12);
    for (let i = 0; i < leftCheekPoints.length - 1; i++) {
        const segGeom = new THREE.CylinderGeometry(0.004, 0.004, leftCheekPoints[i].distanceTo(leftCheekPoints[i + 1]), 8);
        const seg = new THREE.Mesh(segGeom, cheekMaterial);
        seg.position.set(
            (leftCheekPoints[i].x + leftCheekPoints[i + 1].x) / 2,
            (leftCheekPoints[i].y + leftCheekPoints[i + 1].y) / 2,
            (leftCheekPoints[i].z + leftCheekPoints[i + 1].z) / 2
        );
        seg.lookAt(leftCheekPoints[i + 1]);
        seg.rotateX(Math.PI / 2);
        faceGroup.add(seg);
    }
    const rightCheekCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0.30, 0.30, 1.5),
        new THREE.Vector3(0.20, 0.25, 1.5),
        new THREE.Vector3(0.10, 0.35, 1.5)
    );
    const rightCheekPoints = rightCheekCurve.getPoints(12);
    for (let i = 0; i < rightCheekPoints.length - 1; i++) {
        const segGeom = new THREE.CylinderGeometry(0.004, 0.004, rightCheekPoints[i].distanceTo(rightCheekPoints[i + 1]), 8);
        const seg = new THREE.Mesh(segGeom, cheekMaterial);
        seg.position.set(
            (rightCheekPoints[i].x + rightCheekPoints[i + 1].x) / 2,
            (rightCheekPoints[i].y + rightCheekPoints[i + 1].y) / 2,
            (rightCheekPoints[i].z + rightCheekPoints[i + 1].z) / 2
        );
        seg.lookAt(rightCheekPoints[i + 1]);
        seg.rotateX(Math.PI / 2);
        faceGroup.add(seg);
    }
    faceGroup.position.set(0, -0.7, -1);
    faceGroup.rotation.y = Math.PI;
    return faceGroup;
}

// 표정 3(실눈, o자 입모양)
function createTrainFace3() {
    const faceGroup = new THREE.Group();
    // 얼굴(구)
    const faceGeometry = new THREE.SphereGeometry(0.50, 32, 32);
    const faceMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 80, specular: 0xffffff });
    const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
    faceMesh.position.set(0, 0.45, 1);
    faceGroup.add(faceMesh);

    // 코(작은 구)
    const noseGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc, shininess: 100 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0.4, 1.5);
    faceGroup.add(nose);

    // 왼쪽 눈(실눈: 얇은 원기둥)
    const eyeMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const leftEyeNarrow = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.012, 16), eyeMat);
    leftEyeNarrow.position.set(-0.2, 0.58, 1.5);
    faceGroup.add(leftEyeNarrow);
    // 왼쪽 눈 흰색 아래반구
    const leftEyeWhiteGeom = new THREE.SphereGeometry(0.07, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const leftEyeWhiteMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const leftEyeWhite = new THREE.Mesh(leftEyeWhiteGeom, leftEyeWhiteMat);
    leftEyeWhite.position.set(-0.2, 0.56, 1.5);
    faceGroup.add(leftEyeWhite);

    // 오른쪽 눈(실눈: 얇은 원기둥)
    const rightEyeNarrow = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.012, 16), eyeMat);
    rightEyeNarrow.position.set(0.2, 0.58, 1.5);
    faceGroup.add(rightEyeNarrow);
    // 오른쪽 눈 흰색 아래반구
    const rightEyeWhite = new THREE.Mesh(leftEyeWhiteGeom.clone(), leftEyeWhiteMat);
    rightEyeWhite.position.set(0.2, 0.56, 1.5);
    faceGroup.add(rightEyeWhite);

    // 입(o 모양: 도넛)
    const mouthO = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 16, 32), new THREE.MeshPhongMaterial({ color: 0x222222 }));
    mouthO.position.set(0, 0.22, 1.5);
    faceGroup.add(mouthO);

    // 광대(동일)
    const cheekMaterial = new THREE.MeshPhongMaterial({ color: 0xbbbbbb, shininess: 80 });
    const leftCheekCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.30, 0.30, 1.5),
        new THREE.Vector3(-0.20, 0.25, 1.5),
        new THREE.Vector3(-0.10, 0.35, 1.5)
    );
    const leftCheekPoints = leftCheekCurve.getPoints(12);
    for (let i = 0; i < leftCheekPoints.length - 1; i++) {
        const segGeom = new THREE.CylinderGeometry(0.004, 0.004, leftCheekPoints[i].distanceTo(leftCheekPoints[i + 1]), 8);
        const seg = new THREE.Mesh(segGeom, cheekMaterial);
        seg.position.set(
            (leftCheekPoints[i].x + leftCheekPoints[i + 1].x) / 2,
            (leftCheekPoints[i].y + leftCheekPoints[i + 1].y) / 2,
            (leftCheekPoints[i].z + leftCheekPoints[i + 1].z) / 2
        );
        seg.lookAt(leftCheekPoints[i + 1]);
        seg.rotateX(Math.PI / 2);
        faceGroup.add(seg);
    }
    const rightCheekCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0.30, 0.30, 1.5),
        new THREE.Vector3(0.20, 0.25, 1.5),
        new THREE.Vector3(0.10, 0.35, 1.5)
    );
    const rightCheekPoints = rightCheekCurve.getPoints(12);
    for (let i = 0; i < rightCheekPoints.length - 1; i++) {
        const segGeom = new THREE.CylinderGeometry(0.004, 0.004, rightCheekPoints[i].distanceTo(rightCheekPoints[i + 1]), 8);
        const seg = new THREE.Mesh(segGeom, cheekMaterial);
        seg.position.set(
            (rightCheekPoints[i].x + rightCheekPoints[i + 1].x) / 2,
            (rightCheekPoints[i].y + rightCheekPoints[i + 1].y) / 2,
            (rightCheekPoints[i].z + rightCheekPoints[i + 1].z) / 2
        );
        seg.lookAt(rightCheekPoints[i + 1]);
        seg.rotateX(Math.PI / 2);
        faceGroup.add(seg);
    }
    faceGroup.position.set(0, -0.7, -1);
    faceGroup.rotation.y = Math.PI;
    return faceGroup;
}

// 최초에는 표정1(자는)만 보이도록
const trainFace1 = createTrainFace1();
const trainFace2 = createTrainFace2();
const trainFace3 = createTrainFace3();
trainGroup.add(trainFace1);
let currentFace = 1;

function setTrainFace(faceNum) {
    // faceNum: 1=자는, 2=깨어남, 3=실눈
    if (faceNum === 1) {
        if (currentFace !== 1) {
            trainGroup.remove(trainFace2);
            trainGroup.remove(trainFace3);
            trainGroup.add(trainFace1);
            currentFace = 1;
        }
    } else if (faceNum === 2) {
        if (currentFace !== 2) {
            trainGroup.remove(trainFace1);
            trainGroup.remove(trainFace3);
            trainGroup.add(trainFace2);
            currentFace = 2;
        }
    } else if (faceNum === 3) {
        if (currentFace !== 3) {
            trainGroup.remove(trainFace1);
            trainGroup.remove(trainFace2);
            trainGroup.add(trainFace3);
            currentFace = 3;
        }
    }
}

// --- 표정 전환 타이머 관리용 변수 추가 ---
let faceSwitchTimeouts = [];
// --- 난이도 조절: 자는→실눈 시간 변수 및 감소 로직 수정 ---
let sleepToNarrowBaseDelay = 500 + Math.random() * 5000; // 최초 랜덤값(게임 시작/리셋 시)
let sleepToNarrowCurrentDelay = sleepToNarrowBaseDelay;
const sleepToNarrowMinDelay = 200; // 최소 0.2초
const sleepToNarrowDecrease = 100; // 0.1초씩 감소

function resetSleepToNarrowDelay() {
    sleepToNarrowBaseDelay = 500 + Math.random() * 5000;
    sleepToNarrowCurrentDelay = sleepToNarrowBaseDelay;
}

function decreaseSleepToNarrowDelay() {
    const prevDelay = sleepToNarrowCurrentDelay;
    sleepToNarrowCurrentDelay = Math.max(sleepToNarrowMinDelay, sleepToNarrowCurrentDelay - sleepToNarrowDecrease);
    if (sleepToNarrowCurrentDelay !== prevDelay) {
        console.log(`[난이도↑] 자는→실눈 전환 시간: ${sleepToNarrowCurrentDelay}ms (점수: ${score})`);
    }
}

function startRandomFaceSwitch() {
    function scheduleNextSwitch() {
        // 자는→실눈 시간(난이도 반영, 랜덤 초기화 X)
        const sleepToNarrowDelay = sleepToNarrowCurrentDelay;
        const t1 = setTimeout(() => {
            setTrainFace(3); // 실눈
            // 0.2~0.7초 후 랜덤하게 자는(1) 또는 깨어남(2)으로 전환
            const narrowToNextDelay = 300 + Math.random() * 500;
            const t2 = setTimeout(() => {
                // 30% 확률로 자는(1) 또는 70% 깨어남(2)
                if (Math.random() < 0.3) {
                    setTrainFace(1);
                    // 자는→실눈 시간은 더 이상 랜덤 초기화하지 않음
                    scheduleNextSwitch();
                } else {
                    setTrainFace(2);
                    // 1~2초 후 다시 자는(1)으로 전환
                    const awakeToSleepDelay = 1000 + Math.random() * 1000;
                    const t3 = setTimeout(() => {
                        setTrainFace(1);
                        // 자는→실눈 시간은 더 이상 랜덤 초기화하지 않음
                        scheduleNextSwitch();
                    }, awakeToSleepDelay);
                    faceSwitchTimeouts.push(t3);
                }
            }, narrowToNextDelay);
            faceSwitchTimeouts.push(t2);
        }, sleepToNarrowDelay);
        faceSwitchTimeouts.push(t1);
    }
    setTrainFace(1); // 최초는 잠자는 표정
    resetSleepToNarrowDelay(); // 게임 시작/리셋 시에만 랜덤 초기화
    scheduleNextSwitch();
}

function stopRandomFaceSwitch() {
    for (const t of faceSwitchTimeouts) clearTimeout(t);
    faceSwitchTimeouts = [];
}

startRandomFaceSwitch();

// --- 사람 생성 함수 (집보다 작게)
let person = null;
let boxOnHead = null;
function createPersonWithReturn(x, y, z, scale = 1) {
    const personGroup = new THREE.Group();
    // 머리
    const headGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffe0bd });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.71, 0);
    personGroup.add(head);
    // 몸통
    const bodyGeometry = new THREE.CylinderGeometry(0.13, 0.13, 0.35, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4682b4 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.41, 0);
    personGroup.add(body);
    // 왼팔
    const armGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.28, 12);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffe0bd });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.20, 0.65, 0);
    leftArm.rotation.z = Math.PI / 8;
    personGroup.add(leftArm);
    // 오른팔
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.20, 0.65, 0);
    rightArm.rotation.z = -Math.PI / 8;
    personGroup.add(rightArm);
    // 왼다리
    const legGeometry = new THREE.CylinderGeometry(0.045, 0.045, 0.32, 12);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.07, 0.15, 0);
    personGroup.add(leftLeg);
    // 오른다리
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.07, 0.15, 0);
    personGroup.add(rightLeg);
    // 머리 위 상자
    const boxGeometry = new THREE.BoxGeometry(0.60, 0.80, 0.60);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, 1.2, 0); // 머리 위에 위치
    personGroup.add(box);
    boxOnHead = box;
    // 전체 스케일 및 위치
    personGroup.scale.set(scale, scale, scale);
    personGroup.position.set(x, y, z);
    scene.add(personGroup);
    return personGroup;
}
person = createPersonWithReturn(-6, 0, -1, 0.7);
person.rotation.y = Math.PI / 2;
if (boxOnHead) boxOnHead.visible = false; // 시작 시 상자 숨김

// --- 집 앞에 반투명 원기둥 추가 ---
// 왼쪽 집 앞 (노랑, z = -1)
const leftCylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.7, 32);
const leftCylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 });
const leftCylinder = new THREE.Mesh(leftCylinderGeometry, leftCylinderMaterial);
leftCylinder.position.set(-5.5, 0.35, -1);
scene.add(leftCylinder);
// 오른쪽 집 앞 (파랑, z = -1)
const rightCylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.7, 32);
const rightCylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 0.3 });
const rightCylinder = new THREE.Mesh(rightCylinderGeometry, rightCylinderMaterial);
rightCylinder.position.set(5.5, 0.35, -1);
scene.add(rightCylinder);

// --- 캐릭터가 스페이스바를 누르고 있으면 오른쪽(+)으로 이동 ---
let moveRight = false;
let spaceDownTime = null; // 스페이스바 누른 시점
let wasSpacePressed = false; // 이전 프레임에서 스페이스가 눌려있었는지
let triggeredTrainMove = false; // 기차 이동 트리거

window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (!moveRight) spaceDownTime = performance.now();
        moveRight = true;
        // trainFace2(깨어남) 상태에서 스페이스바를 누르면 무조건 이동 트리거
        if (currentFace === 2 && !triggeredTrainMove) {
            triggeredTrainMove = true;
        }
    }
}); 
window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') {
        moveRight = false;
        spaceDownTime = null;
    }
});

let legSwingAngle = 0;
let legSwingDirection = 1;

let boxTargetY = 0.98; // 머리 위 기본 위치

// --- 점수 UI 추가 ---
let score = 0;
const scoreDiv = document.createElement('div');
scoreDiv.style.position = 'absolute';
scoreDiv.style.top = '60px';
scoreDiv.style.left = '50px';
scoreDiv.style.color = 'white';
scoreDiv.style.fontSize = '3em';
scoreDiv.style.fontFamily = 'Arial, sans-serif';
scoreDiv.style.textShadow = '1px 1px 4px #000';
scoreDiv.innerText = 'Score : 0';
document.body.appendChild(scoreDiv);

// --- 우측 상단에 Space Bar 안내 텍스트 추가 ---
const spaceHintDiv = document.createElement('div');
spaceHintDiv.style.position = 'absolute';
spaceHintDiv.style.top = '65px';
spaceHintDiv.style.right = '50px';
spaceHintDiv.style.color = 'white';
spaceHintDiv.style.fontSize = '2em';
spaceHintDiv.style.fontFamily = 'Arial, sans-serif';
spaceHintDiv.style.textShadow = '1px 1px 4px #000';
spaceHintDiv.innerText = '*Space Bar = Move';
document.body.appendChild(spaceHintDiv);

let lastScoreCollision = false;

let gameOverTimeout = null;
let gameOverDiv = null;
let restartBtn = null;

function restartGame() {
    // Remove Game Over UI
    if (gameOverDiv) gameOverDiv.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    // Reset game state
    triggeredTrainMove = false;
    score = 0;
    scoreDiv.innerText = 'Score : 0';
    if (scoreDiv) scoreDiv.style.display = '';
    if (spaceHintDiv) spaceHintDiv.style.display = '';
    // Reset train position
    trainGroup.position.set(0, 4, -20);
    // Reset person position
    if (person) person.position.set(-6, 0, -1);
    // Reset box on head
    if (boxOnHead) boxOnHead.visible = false;
    // Reset face switching
    stopRandomFaceSwitch();
    resetSleepToNarrowDelay(); // 난이도 변수도 초기화
    startRandomFaceSwitch();
}

function showGameOver() {
    if (scoreDiv) scoreDiv.style.display = 'none'; // 기존 점수 UI 숨김
    if (spaceHintDiv) spaceHintDiv.style.display = 'none'; // Space Bar 안내도 숨김
    if (!gameOverDiv) {
        gameOverDiv = document.createElement('div');
        gameOverDiv.style.position = 'fixed';
        gameOverDiv.style.top = '50%';
        gameOverDiv.style.left = '50%';
        gameOverDiv.style.transform = 'translate(-50%, -50%)';
        gameOverDiv.style.textAlign = 'center';
        gameOverDiv.style.zIndex = '9999';
        // Game Over 텍스트
        const mainText = document.createElement('div');
        mainText.innerText = 'Game Over!';
        mainText.style.fontSize = '6em';
        mainText.style.fontWeight = 'bold';
        mainText.style.color = '#fff';
        mainText.style.textShadow = '2px 2px 8px #000';
        // Score 텍스트
        const scoreText = document.createElement('div');
        scoreText.innerText = 'Score : ' + score;
        scoreText.style.fontSize = '3em';
        scoreText.style.marginTop = '20px';
        scoreText.style.color = '#fff';
        scoreText.style.textShadow = '1px 1px 4px #000';
        gameOverDiv.appendChild(mainText);
        gameOverDiv.appendChild(scoreText);
        document.body.appendChild(gameOverDiv);
    } else {
        // 점수 갱신
        gameOverDiv.children[1].innerText = 'Score : ' + score;
        gameOverDiv.style.display = '';
    }
    // --- Restart 버튼 추가 ---
    if (!restartBtn) {
        restartBtn = document.createElement('button');
        restartBtn.innerText = 'Restart';
        restartBtn.style.position = 'fixed';
        restartBtn.style.right = '60px';
        restartBtn.style.bottom = '60px';
        restartBtn.style.fontSize = '2em';
        restartBtn.style.padding = '0.5em 2em';
        restartBtn.style.background = '#222';
        restartBtn.style.color = '#fff';
        restartBtn.style.border = '2px solid #fff';
        restartBtn.style.borderRadius = '12px';
        restartBtn.style.boxShadow = '2px 2px 8px #000';
        restartBtn.style.zIndex = '10000';
        restartBtn.onclick = restartGame;
        document.body.appendChild(restartBtn);
    } else {
        restartBtn.style.display = '';
    }
}

function animate() {
    requestAnimationFrame(animate);

    // 기차 이동 트리거가 발동되면 나머지 움직임 모두 정지
    if (triggeredTrainMove) {
        stopRandomFaceSwitch(); // 표정 변화 타이머도 정지
        if (!gameOverTimeout) {
            gameOverTimeout = setTimeout(showGameOver, 1000);
        }
        trainGroup.position.x += (0 - trainGroup.position.x) * 0.2;
        trainGroup.position.y += (2.5 - trainGroup.position.y) * 0.2;
        trainGroup.position.z += ((-10) - trainGroup.position.z) * 0.2;
        if (Math.abs(trainGroup.position.x - 0) < 0.01) trainGroup.position.x = 0;
        if (Math.abs(trainGroup.position.y - 2.5) < 0.01) trainGroup.position.y = 2.5;
        if (Math.abs(trainGroup.position.z + 10) < 0.01) trainGroup.position.z = -10;
        renderer.render(scene, camera);
        return;
    } else {
        // 트리거 해제 시 Game Over 텍스트 숨김 및 타이머 초기화
        if (gameOverDiv) gameOverDiv.style.display = 'none';
        if (scoreDiv) scoreDiv.style.display = '';
        if (spaceHintDiv) spaceHintDiv.style.display = '';
        if (gameOverTimeout) {
            clearTimeout(gameOverTimeout);
            gameOverTimeout = null;
        }
    }

    // --- trainFace2에서 spaceDownTime 기록 로직 ---
    if (currentFace === 2) {
        if (moveRight && !wasSpacePressed) {
            spaceDownTime = performance.now();
        }
    } else {
        spaceDownTime = null;
        triggeredTrainMove = false; // 표정1로 돌아가면 트리거 해제
    }
    wasSpacePressed = moveRight;

    // --- 기차 이동 트리거 조건 ---
    // (currentFace === 2 && moveRight && spaceDownTime && !triggeredTrainMove) {
    //     const heldTime = (performance.now() - spaceDownTime) / 1000;
    //     if (heldTime > 0.4) {
    //         triggeredTrainMove = true;
    //     }
    // }
    // --- 기차 이동 ---
    if (triggeredTrainMove) {
        trainGroup.position.x += (0 - trainGroup.position.x) * 0.2;
        trainGroup.position.y += (2.5 - trainGroup.position.y) * 0.2;
        trainGroup.position.z += ((-10) - trainGroup.position.z) * 0.2;
        if (Math.abs(trainGroup.position.x - 0) < 0.01) trainGroup.position.x = 0;
        if (Math.abs(trainGroup.position.y - 2.5) < 0.01) trainGroup.position.y = 2.5;
        if (Math.abs(trainGroup.position.z + 10) < 0.01) trainGroup.position.z = -10;
    }

    if (moveRight && person) {
        person.position.x += 0.01;
        // 다리 애니메이션
        legSwingAngle += 0.08 * legSwingDirection;
        if (legSwingAngle > 0.5) legSwingDirection = -1;
        if (legSwingAngle < -0.5) legSwingDirection = 1;
        if (person.children) {
            person.children[4].rotation.x = legSwingAngle;
            person.children[5].rotation.x = -legSwingAngle;
        }
        // 상자 y 목표를 머리 위로
        boxTargetY = 1.2;
        // x좌표가 6을 넘으면 -6으로 이동
        if (person.position.x > 5.5) {
            person.position.x = -6;
        }
    } else if (person) {
        if (person.children) {
            person.children[4].rotation.x *= 0.7;
            person.children[5].rotation.x *= 0.7;
        }
        legSwingAngle *= 0.7;
        // 상자 y 목표를 0.15로(캐릭터 가리기)
        boxTargetY = 0.6;
    }

    // --- 원기둥 충돌 체크 및 상자 표시/숨김 ---
    if (person && boxOnHead) {
        // 캐릭터 중심 x, z
        const px = person.position.x;
        const pz = person.position.z;
        // 노란 원기둥 위치: (-5.5, -1), 반지름 0.3
        const distYellow = Math.sqrt((px + 5.5) ** 2 + (pz + 1) ** 2);
        // 파란 원기둥 위치: (5.5, -1), 반지름 0.3
        const distBlue = Math.sqrt((px - 5.5) ** 2 + (pz + 1) ** 2);
        if (distYellow < 0.35) {
            boxOnHead.visible = true;
        } else if (distBlue < 0.35) {
            boxOnHead.visible = false;
        }
        // --- 점수 증가 로직 ---
        if (distBlue < 0.35) {
            if (!lastScoreCollision) {
                score++;
                scoreDiv.innerText = 'Score : ' + score;
                lastScoreCollision = true;
                // 난이도 증가: 자는→실눈 시간 감소
                decreaseSleepToNarrowDelay();
            }
        } else {
            lastScoreCollision = false;
        }
    }

    // 상자 위치를 자연스럽게 보간
    if (boxOnHead) {
        boxOnHead.position.y += (boxTargetY - boxOnHead.position.y) * 0.15;
    }
    renderer.render(scene, camera);
}
animate();
